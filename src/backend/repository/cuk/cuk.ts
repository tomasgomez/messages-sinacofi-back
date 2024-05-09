import { CUKRepository } from '../cukRepository';
import { find } from './find';
import { create } from './create';
import { CUK } from '@/backend/entities/cuk/cuk';
import { ICUK } from '@/backend/entities/cuk/interface';
import { Filter } from '@/backend/entities/global/filter';
import { update } from './update';

export class PrismaCukAdapter implements CUKRepository{
  // find CUK
  find = async(cuk: Filter): Promise<CUK[] | Error> => find(cuk);
  
  // create CUK
  create = async(cuk: ICUK): Promise<ICUK | Error> =>  create(cuk);

  // update CUK
  update = async(cuk: ICUK): Promise<ICUK | Error> => update(cuk);
  
}
