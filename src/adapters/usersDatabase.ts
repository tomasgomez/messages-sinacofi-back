import { UserRepository } from '../interfaces/userRepository';
import { PrismaClient } from '@prisma/client'; //TODO: define prisma client

const prisma = new PrismaClient(); 

export class PrismaUserAdapter implements UserRepository {
  async findById(id: string): Promise<User | null> {
    try {
      
      /* Find a user by their ID */
      const user = await prisma.user.findUnique({ where: { id } }); 

      return user;
    } catch (error) {

      //TODO: Handle errors appropriately
      console.error('Error fetching user:', error);
      return null;
    }
  }
}
