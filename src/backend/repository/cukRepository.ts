import {
  CUK
} from '../entities/cuk/cuk';
import {
  ICUK
} from '../entities/cuk/interface';

export interface CUKRepository {
  find(cuk: CUK, count: string, offset: string): Promise < CUK[] | Error >
  create(cuk: ICUK): Promise < ICUK | Error >
}