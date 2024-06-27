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
    INIT = "01", // 670 enviado
    IN_PROCESS = "021", // 670
    APPROVED = "022", // 670
    REJECTED = "023", // 672
    START_NORMALIZATION = "XXX", // 673
    END_NORMALIZATION = "YYY", // 670
    SIGN_IN_PROGRESS = "041", // 670
    SIGNED = "042", // 671 por firmar
    ACCEPTED = "07", // 674
    SENT_LIQUIDATION = "09",  // 675
    SEND_LIQUIDATION_PAYMENT = "10",  // 677
        PAYMENT = "11", // 677
        SENT_REJECTION = "12", // 678
        SENT_CONFIRM_PAYMENT = "14",  // 679
    PAYMENT_DATA = "999", // non-visible
    PAYMENT_OPTION_REJECTION = "1000", // non-visible
    PAYMENT_OPTION_ACCEPTED = "1001", // non-visible
}

export function getStatusCodeByMessageCode(code?: string, status?: string[]): string[] {
    switch (code) {
        case "670":

            if(status?.includes('05') || status?.includes('06')){
                return [
                    ForeclosureStatus.INIT,
                    ForeclosureStatus.IN_PROCESS,
                    ForeclosureStatus.APPROVED,
                    ForeclosureStatus.SIGN_IN_PROGRESS
                ]
            }

            // 670 y pendiente firma no pasa
            // if(status?.includes('01')){
            //     return []
            // }

            // 670 y pendiente de envio solo origen
            if(status?.includes('01')){
                return ['-']
            }
            return [
                ForeclosureStatus.INIT,
                ForeclosureStatus.IN_PROCESS,
                ForeclosureStatus.APPROVED,
                ForeclosureStatus.END_NORMALIZATION,
                ForeclosureStatus.SIGN_IN_PROGRESS
            ];
        case "671":
            return [
                ForeclosureStatus.SIGNED,
            ];
        case "672":
            return [
                ForeclosureStatus.REJECTED,
            ];
        case "673":
            return [
                ForeclosureStatus.START_NORMALIZATION,
            ];
        case "674":
            return [
                ForeclosureStatus.ACCEPTED,
            ];
        case "675":
            return [
                ForeclosureStatus.SENT_LIQUIDATION,
            ];
        case "677":
            return [
                ForeclosureStatus.SEND_LIQUIDATION_PAYMENT,
                ForeclosureStatus.PAYMENT,
            ];
        case "678":
            return [
                ForeclosureStatus.SENT_REJECTION,
            ];
        case "679":
            return [
                ForeclosureStatus.SENT_CONFIRM_PAYMENT,
            ];
        default:
            return [];
    }

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
        case ForeclosureStatus.INIT:
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
            return MessageDescriptions.ESCRITURA_FIRMADA;
        default:
            return '';
    }
  }

export type Status = 'completed'|'in_progress'|'normalization'|'rejected';

export function getForeclosureStatusCodesByStatus(status: Status): string[] {
    switch (status) {
        case 'completed':
            return [ForeclosureStatus.SENT_CONFIRM_PAYMENT];
        case 'in_progress':
            return [
                ForeclosureStatus.END_NORMALIZATION,
                ForeclosureStatus.SIGN_IN_PROGRESS,
                ForeclosureStatus.APPROVED,
                ForeclosureStatus.IN_PROCESS,
                ForeclosureStatus.SIGNED,
                ForeclosureStatus.INIT,
                ForeclosureStatus.ACCEPTED,
                ForeclosureStatus.SENT_LIQUIDATION,
                ForeclosureStatus.SEND_LIQUIDATION_PAYMENT,
                ForeclosureStatus.PAYMENT,
                ForeclosureStatus.REJECTED,
                '-'
            ];
        case 'normalization':
            return [ForeclosureStatus.START_NORMALIZATION];
        case 'rejected':
            return [ForeclosureStatus.REJECTED];
        default:
            return [];
    }
}

