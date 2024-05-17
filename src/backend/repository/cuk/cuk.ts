import { CUKRepository } from '../cukRepository';
import { find } from './find';
import { create } from './create';
import { CUK } from '@/backend/entities/cuk/cuk';
import { Filter } from '@/backend/entities/cuk/filter';
import { update } from './update';

export class PrismaCukAdapter implements CUKRepository{
  // find CUK
  find = async(cuk: Filter): Promise<CUK[] | Error> => find(cuk);
  
  // create CUK
  create = async(cuk: CUK): Promise<CUK | Error> =>  create(cuk);

  // update CUK
  update = async(cuk: CUK): Promise<CUK | Error> => update(cuk);
  
}
