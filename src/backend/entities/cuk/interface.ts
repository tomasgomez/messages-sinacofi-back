/*
 * Interface representing a CUK process.
 */
export interface ICUK {
    id?: string;
    name?: string | null;
    description?: string | null;
    creationDate?: string | null;

    cukCode?: string | null;
    issuedDate?: string | null;
    channel?: string | null;
    status?: string | null;
    institutionDestination?: string | null;

    history?: any;

    setTime?(): void;
    setCukCode?(institutionCode: string): void;

}