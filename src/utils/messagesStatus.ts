
const messageStatus = [
   { "code": "01", "description": "PREPARADO" },
    { "code": "05", "description": "ENVIADO" },
    { "code": "06", "description": "BANDEJA DE ENTRADA" }
];

export enum MessageStatus {
    PREPARADO = "01",
    ENVIADO = "05",
    BANDEJA_DE_ENTRADA = "06"
}