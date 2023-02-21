import { Hono } from "hono";
import { z } from "zod";
import { collateCSVs } from "./csv";
import { getCSV, setCSV } from "./db";

export type Env = {
    CSVStorage: KVNamespace;
    CSVStorageKey: string;
};

const app = new Hono<{ Bindings: Env }>();

app.post("/upload", async (ctx) => {
    const body = z.string().parse(ctx.body);

    const resultingCSV = collateCSVs([await getCSV(ctx.env), body]);

    setCSV(ctx.env, resultingCSV);

    return ctx.text("CSV Upload successful");
});

app.get("/get", async (ctx) =>
    ctx.text(await getCSV(ctx.env), 201, {
        "Content-Type": "text/csv",
    })
);

export default {
    fetch: app.fetch,
};
