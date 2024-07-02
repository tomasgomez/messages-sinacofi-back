import { CUKRepository } from '../cukRepository';
import { find } from './find';
import { create } from './create';
import { CUK } from '@/backend/entities/cuk/cuk';
import { Filter } from '@/backend/entities/cuk/filter';
import { update } from './update';
import { findInformsAccepted } from './findInformsAccepted';
import { findInformsRejected } from './findInformsRejected';
import { Paginated } from '@/backend/entities/pagination/Paginated';
import { getTotal } from './getTotal';

export class PrismaCukAdapter implements CUKRepository{
  // find CUK
  find = async(cuk: Filter): Promise<Paginated<CUK> | Error> => find(cuk);
  // create CUK
  create = async(cuk: CUK): Promise<CUK | Error> =>  create(cuk);
  // update CUK
  update = async(cuk: CUK): Promise<CUK | Error> => update(cuk);
  findInformsAccepted = async(cuk: Filter): Promise<Paginated<CUK> | Error> => findInformsAccepted(cuk);
  findInformsRejected = async(cuk: Filter): Promise<Paginated<CUK> | Error> => findInformsRejected(cuk);
  getTotal = async (filter: Filter): Promise < string | Error >  => getTotal(filter);
  
}
