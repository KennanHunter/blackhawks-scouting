import { z } from "zod";
import { Env } from "./index";

export const getCSV = async (env: Env): Promise<string> =>
    z.string().parse(await env.CSVStorage.get(env.CSVStorageKey));

export const setCSV = (env: Env, newCSV: string): Promise<void> =>
    env.CSVStorage.put(env.CSVStorageKey, newCSV);
