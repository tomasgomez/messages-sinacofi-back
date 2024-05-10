import { Message } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { processMessageParameters, setCukDestination, setCukStatus, setInstitutionCode } from '@/backend/utils/foreclosure';
import { createMessage } from '@/backend/usecases/message/createMessage';
import { CUK } from '@/backend/entities/cuk/cuk';


export async function handle671(cuk: CUK, message: Message, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {
    processMessageParameters(message.parameters, cuk);
        setInstitutionCode(cuk, message.sender);
        setCukDestination(cuk, message.receiver);
        setCukStatus(cuk, message.status);

        const createdCuk = await cukRepository.create(cuk);
        if (createdCuk instanceof Error) {
          throw createdCuk;
        }

        if (cuk instanceof Error) {
          return cuk;
      }

        if (cuk.cukCode === undefined) {
            return new Error('No cuk code returned');
        }

        message.cukCode = cuk.cukCode;

        return await createMessage(messageRepository, message);
}
