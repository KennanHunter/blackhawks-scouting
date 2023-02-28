export const collateCSVs = (...csvs: string[]): string => {
    const header = csvs[0].split("\n")[0];

    const recordsWithoutHeaders = csvs
        .map((val) => val.split("\n").slice(1))
        .flat();

    const sortedRecordsWithoutHeaders = recordsWithoutHeaders.sort((a, b) => {
        const aTimestamp = Number.parseInt(a.split('"').slice(-2, -1)[0]);
        const bTimestamp = Number.parseInt(b.split('"').slice(-2, -1)[0]);

        return aTimestamp - bTimestamp;
    });

    return [header, ...sortedRecordsWithoutHeaders].join("\n");
};
