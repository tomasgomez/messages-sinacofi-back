import { ScheduleUsecases } from "./interface";
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { PrismaMessageAdapter as PrismaAdapter } from '@/backend/repository/message/message';
import { PrismaCukAdapter } from '@/backend/repository/cuk/cuk';
import { getSchedule } from './methods/getSchedule';


// Parameter usecase
export class ScheduleUsecase implements ScheduleUsecases {
    constructor(private readonly cukRepository: CUKRepository, private readonly messageRepository: MessageRepository){}
    // get Schema detail
    getSchedule = async (): Promise < Error > => await getSchedule(this.cukRepository, this.messageRepository);

}
const messageRepository: MessageRepository = new PrismaAdapter();
const cukRepository: CUKRepository = new PrismaCukAdapter();
export const scheduleUseCase: ScheduleUsecase = new ScheduleUsecase(cukRepository, messageRepository); // Add it on the api layer