import { CSV } from "@scout/shared";

export const collateCSVs = (...csvs: string[]): string => {
    const header = csvs[0].split("\n")[0];

    const scoutedTimeIndex =
        CSV.deserialize(header).header.indexOf("ScoutedTime");

    const recordsWithoutHeaders = csvs
        .map((val) => val.split("\n").slice(1))
        .flat();

    const sortedRecordsWithoutHeaders = recordsWithoutHeaders
        .sort((a, b) => {
            const aTimestamp = Number.parseInt(
                CSV.deserialize(a).header[scoutedTimeIndex]
            );
            const bTimestamp = Number.parseInt(
                CSV.deserialize(b).header[scoutedTimeIndex]
            );

            return aTimestamp - bTimestamp;
        })
        .reduce((prev, cur) => {
            if (prev.includes(cur)) {
                return prev;
            }

            return [...prev, cur];
        }, [] as string[]);

    return [header, ...sortedRecordsWithoutHeaders].join("\n");
};
