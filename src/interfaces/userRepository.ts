
export interface UserRepository {
    findById(id: string): Promise<User | null>;
  }
  