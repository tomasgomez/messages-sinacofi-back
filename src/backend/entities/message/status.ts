export enum MessageStatus {
    PREPARADO = "01",
    ENVIADO = "05",
    BANDEJA_DE_ENTRADA = "06",
    FIRMADO = "011",
}

export type Status = {
    id: string;
    createdAt: Date;
    messageId: string;
}