/*
 * Interface representing a CUK process.
 */
export interface ICUK {
    id?: string;
    name?: string | null;
    description?: string | null;
    creationDate?: string | null;

    cukCode?: string | null;
    foreclosureDate?: string | null;
    channel?: string | null;
    status?: string | null;
    clientDni?: string | null;
    clientName?: string | null;
    institutionDestination?: string | null;

    setTime?(): void;
    setCukCode?(): void;

}