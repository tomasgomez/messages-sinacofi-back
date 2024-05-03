import { PrismaClient } from '@prisma/client';
import { prisma } from './client';

export class PrismaClientWrapper {
  private client: PrismaClient = prisma;

  getClient(): PrismaClient {
        return this.client;
    }
}
