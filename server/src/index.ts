import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { collateCSVs } from "./csv";
import { getCSVfromDB, putCSVtoDB } from "./db";

export type Env = {
    CSVStorage: KVNamespace;
    CSVStorageKey: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

const uploadSchema = () =>
    z.object({
        csvs: z.string().array(),
    });

export type uploadSchema = z.infer<ReturnType<typeof uploadSchema>>;

app.post("/upload", async (ctx) => {
    const body = uploadSchema().parse(ctx.req.parseBody());

    const resultingCSV = collateCSVs(await getCSVfromDB(ctx.env), ...body.csvs);

    putCSVtoDB(ctx.env, resultingCSV);

    return ctx.text("CSV Upload successful");
});

app.get("/get", async (ctx) =>
    ctx.text(await getCSVfromDB(ctx.env), 201, {
        "Content-Type": "text/csv",
    })
);

app.get("/", (ctx) =>
    ctx.html(`
<link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura-dark.css"/>
    
<h1>Scouting App Synchronizer API</h1>

<a href="https://scout.kennan.tech/">Web APP</a>
<br />
<a href="https://github.com/KennanHunter/blackhawks-scouting">Github</a>
<br />
<a href="/get">Get CSV</a>`)
);

export default {
    fetch: app.fetch,
};
