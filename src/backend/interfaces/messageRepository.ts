
export interface MessageRepository {
    findById(id: string): Promise<Message | null>;
  }
  