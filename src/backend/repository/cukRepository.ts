import {
  CUK
} from '../entities/cuk/cuk';
import {
  Filter
} from '../entities/cuk/filter';

export interface CUKRepository {
  find(filter: Filter): Promise < CUK[] | Error >
  create(cuk: CUK): Promise < CUK | Error >
  update(cuk: CUK): Promise < CUK | Error >
}