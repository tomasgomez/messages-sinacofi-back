const foreclosureMessageCodes = [
    "670",
    "671",
    "672",
    "673",
    "674",
    "675",
    "676",
    "677",
    "678",
    "679",
 ]

export enum ForeclosureStatus {
    IN_PROCESS = "021",
    APPROVED = "022",
    REJECTED = "023",
    START_NORMALIZATION = "XXX",
    END_NORMALIZATION = "YYY",
    SIGN_IN_PROGRESS = "041",
    SIGNED = "042",
    PREPARED = "01",
    SENT = "05",
    RECEIVED = "06",
    ACCEPTED = "07",
    SENT_LIQUIDATION = "09",
  }

 export function isForeclosureMessageCode(code?: string ): boolean {

   if (!code) {
       return false;
   }
    return foreclosureMessageCodes.includes(code);
 }

 enum MessageDescriptions {
  ALZAMIENTO_HIPOTECARIO = "Envío Alzamiento Hipotecario",
  EVALUACION_DE_ALZAMIENTO_HIPOTECARIO_EN_PROCESO = "Evaluación de Alzamiento Hipotecario en Proceso",
  ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO = "Evaluación de Alzamiento Hipotecario Aceptada",
  RECHAZO_DE_ALZAMIENTO_HIPOTECARIO = "Evaluación de Alzamiento Hipotecario Rechazada",
  AVISO_DE_CLIENTE_EN_NORMALIZACION = "Aviso de Cliente en Normalización",
  TRANSFERENCIA_DE_FONDOS_INDIVIDUAL = "TRANSFERENCIA DE FONDOS INDIVIDUAL",
  ESCRITURA_FIRMADA = "Escritura Firmada", 
  TEXTO_LIBRE = "TEXTO LIBRE",
}


 export function getDescriptionByStatus(status: string): string {
    switch (status) {
        case ForeclosureStatus.PREPARED:
            return MessageDescriptions.ALZAMIENTO_HIPOTECARIO;
        case ForeclosureStatus.IN_PROCESS:
            return MessageDescriptions.EVALUACION_DE_ALZAMIENTO_HIPOTECARIO_EN_PROCESO;
        case ForeclosureStatus.APPROVED:
          return MessageDescriptions.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO;
        case ForeclosureStatus.REJECTED:
            return MessageDescriptions.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO;
        case ForeclosureStatus.START_NORMALIZATION:
            return MessageDescriptions.AVISO_DE_CLIENTE_EN_NORMALIZACION;
        case ForeclosureStatus.END_NORMALIZATION:
            return MessageDescriptions.AVISO_DE_CLIENTE_EN_NORMALIZACION;
        case ForeclosureStatus.SIGN_IN_PROGRESS:
            return MessageDescriptions.ALZAMIENTO_HIPOTECARIO
        case ForeclosureStatus.SIGNED:
            return MessageDescriptions.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO;
        default:
            return '';
    }
  }
