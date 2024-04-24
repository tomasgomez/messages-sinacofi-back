import { CUKRepository } from '../cukRepository';
import { find } from './find';
import { create } from './create';
import { CUK } from '@/backend/entities/cuk/cuk';
import { ICUK } from '@/backend/entities/cuk/interface';

export class PrismaCukAdapter implements CUKRepository{
  // find CUK
  find = async(cuk: CUK, count:string, offset: string): Promise<CUK[] | Error> => find(cuk, count, offset);
  
  // create CUK
  create = async(cuk: ICUK): Promise<ICUK | Error> =>  create(cuk);
}
