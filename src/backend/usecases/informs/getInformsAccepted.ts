import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { Filter } from '../../entities/cuk/filter';
import { getForeclosureStatusCodesByStatus } from '@/backend/entities/cuk/codes';
import { Paginated } from '@/backend/entities/pagination/Paginated';

// Get message function
export async function getInformsAccepted(cukRepository: CUKRepository, filter: Filter): Promise < Paginated<CUK> | Error > {
  try {
    const pagination = await cukRepository.findInformsRejected({
      ...filter,
      statusCategory: getForeclosureStatusCodesByStatus('rejected'),
    });

    if (pagination instanceof Error) {
      return pagination;
    }

    if (pagination.data.length === 0) {
      return new Error('No cuks found');
    }

    return pagination;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}