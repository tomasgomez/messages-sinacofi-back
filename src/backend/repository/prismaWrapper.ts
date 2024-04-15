import { PrismaClient } from '@prisma/client';
import { prisma } from './client';

export class PrismaClientWrapper {
  private client: PrismaClient = prisma;

  constructor() {
  }

  async connect(): Promise<void> {
    
  }

  async disconnect(): Promise<void> {
    this.client.$disconnect
  }

  async checkConnection(): Promise<void>{
  }

  getClient(): PrismaClient {
        return this.client;
    }
}
