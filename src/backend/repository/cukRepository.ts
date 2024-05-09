import {
  CUK
} from '../entities/cuk/cuk';
import {
  ICUK
} from '../entities/cuk/interface';
import {
  Filter
} from '../entities/global/filter';

export interface CUKRepository {
  find(filter: Filter): Promise < CUK[] | Error >
  create(cuk: ICUK): Promise < ICUK | Error >
  update(cuk: ICUK): Promise < ICUK | Error >
}