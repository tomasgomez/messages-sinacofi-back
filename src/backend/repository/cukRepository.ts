import {
  CUK
} from '../entities/cuk/cuk';
import {
  Filter
} from '../entities/cuk/filter';
import { Paginated } from '../entities/pagination/Paginated';

export interface CUKRepository {
  find(filter: Filter): Promise < Paginated<CUK> | Error >
  create(cuk: CUK): Promise < CUK | Error >
  update(cuk: CUK): Promise < CUK | Error >
  findInformsAccepted(filter: Filter): Promise < Paginated<CUK> | Error >
  findInformsRejected(filter: Filter): Promise < Paginated<CUK> | Error >
}