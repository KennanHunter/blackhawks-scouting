import { z } from "zod";
import { Env } from "./index";

export const getCSVfromDB = async (env: Env): Promise<string> =>
    z.string().parse((await env.CSVStorage.get(env.CSVStorageKey)) ?? "");

export const putCSVtoDB = (env: Env, newCSV: string): Promise<void> =>
    env.CSVStorage.put(env.CSVStorageKey, newCSV);
