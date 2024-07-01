import { CUKRepository } from '../../../repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';

// Get message function
export async function getSchedule(cukRepository: CUKRepository, messageRepository: MessageRepository): Promise < Error > {
  try {

    /* Run get cuk paginating for 10 */

    return new Error('Not implemented');

  } catch (error: any) {
    console.error('Error on cronjob:', error);
    return error;
  }
}