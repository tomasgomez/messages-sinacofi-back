import { Message } from "@/backend/entities/message/message";
import { MessageRepository } from "@/backend/repository/messageRepository";
import { isForeclosureMessageCode } from "@/backend/entities/cuk/codes";
import { createMessage } from "./createMessage";
import { CUK } from "@/backend/entities/cuk/cuk";
import { MessageTypes } from '@/backend/entities/message/types';
import { handle670 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle670';
import { handle671 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle671';
import { handle672 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle672';
import { handle673 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle673';
import { handle674 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle674';
import { handle675 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle675';
import { handle676 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle676';
import { handle677 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle677';
import { handle678 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle678';
import { handle679 } from '@/backend/usecases/foreclosure/foreclosureMessages/handle679';
import { CUKRepository } from "@/backend/repository/cukRepository";

// Create message function
export async function handleMessage(repository: MessageRepository, cukRepository: CUKRepository, message: Message, ): Promise < Message | Error > {
    try {
        /* Normal flow */
        if (!message.messageCode || !isForeclosureMessageCode(message?.messageCode)) {
            return await createMessage(repository, message);
        }

        /* CUK flow */
        let cuk = new CUK();

        /* Depending on the message code, process the message */
        switch (message.messageCode) {
            /* 670 */
            case (MessageTypes.ALZAMIENTO_HIPOTECARIO): { return handle670(cuk, message, cukRepository, repository) }
            /* 671 */
            case (MessageTypes.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO): { return handle671(cuk, message, cukRepository, repository) }
            /* 672 */
            case (MessageTypes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO): { return handle672(cuk, message, cukRepository, repository) }
            /* 673 */
            case (MessageTypes.AVISO_DE_CLIENTE_EN_NORMALIZACION): { return handle673(cuk, message, cukRepository, repository) }
            /* 674 */
            case (MessageTypes.SOLICITUD_DE_ALZAMIENTO_HIPOTECARIO): { return handle674(cuk, message, cukRepository, repository) }
            /* 675 */
            case (MessageTypes.LIQUIDACION_DE_PREPAGO_DE_ALZAMIENTO_HIPOTECARIO): { return handle675(cuk, message, cukRepository, repository) }
            /* 676 */
            case (MessageTypes.DATOS_PARA_EL_PAGO_AH): { return handle676(cuk, message, cukRepository, repository) }
            /* 677 */
            case (MessageTypes.AVISO_DE_PAGO_AH): { return handle677(cuk, message, cukRepository, repository) }
            /* 678 */
            case (MessageTypes.RECHAZO_DE_PAGO_AH): { return handle678(cuk, message, cukRepository, repository) }
            /* 679 */
            case (MessageTypes.CONFIRMACION_DE_PAGO_AH): { return handle679(cuk, message, cukRepository, repository) }
            /* Default */
            default: { return new Error('Invalid message code')}
        }

    } catch (error: any) {
        console.error('Error creating message:', error);
        return error;
    }
}