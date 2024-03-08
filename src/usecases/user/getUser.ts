import { UserRepository } from '../../interfaces/userRepository';
import { PrismaUserAdapter as PrismaAdapter } from '../../adapters/userDatabase';

export class GetUser {
    constructor(private readonly userRepository: UserRepository) {} 
  
    async execute(userId: string): Promise<User | null> {
      try {
        const user = await this.userRepository.findById(userId);
        return user;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching user:', error);
        return null;
      }
    }
  }


const userRepository: UserRepository = new PrismaAdapter();
const getUserUseCase = new GetUser(userRepository); // Add it on the api layer