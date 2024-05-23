import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { Message } from '../../entities/message/message';
import { isValidMessage } from '@/backend/utils/foreclosure';
import { MessageStatus } from '@/utils/messagesStatus';

export async function createForeclosure(cukRepository: CUKRepository, cuk: CUK, message: Message): Promise<CUK | Error> {
  try {
    if (!isValidMessage(message)) {
      throw new Error('Invalid message');
    }

    cuk.status = MessageStatus.PREPARADO;
  
    const createdCuk = await cukRepository.create(cuk);

    if (createdCuk instanceof Error) {
      throw createdCuk;
    }

    return createdCuk;
  } catch (error: any) {
    console.error('Error creating foreclosure:', error);
    return error;
  }
}
