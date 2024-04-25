import {
  CUK
} from '../entities/cuk/cuk';
import {
  ICUK
} from '../entities/cuk/interface';
import {
  Filter
} from '../entities/cuk/filter';

export interface CUKRepository {
  find(filter: Filter, count: string, offset: string): Promise < CUK[] | Error >
  create(cuk: ICUK): Promise < ICUK | Error >
}