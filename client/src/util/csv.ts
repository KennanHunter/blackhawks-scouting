import { SavedData } from "@/common/stores";

export const CSV = {
    serialize: (data: SavedData) => {
        const escape = (s: string[]): string =>
            s.map((i) => `"${i.replaceAll('"', '""')}"`).join(",");

        // Escape the header and list of records, then put them together into a blob for downloading
        const header = escape(data.header);
        const records = data.values.map((values) => escape(values));

        return [header, ...records].join("\n");
    },
    deserialize: (serializedForm: string): SavedData => {
        const lines = serializedForm.split("\n");

        const stringMatchingRegex = new RegExp(/(?<=((?<=[\s,.:;"']|^)["']))(?:(?=(\\?))\2.)*?(?=\1)/gmu);
   
        const extractFromQuotations = (s: string): string[] =>
          s.match(stringMatchingRegex) as string[] || []

        const header = extractFromQuotations(lines[0]);
        const records = lines.slice(1).map((val) => extractFromQuotations(val));

        return {
            header,
            values: records,
        };
    },
};
