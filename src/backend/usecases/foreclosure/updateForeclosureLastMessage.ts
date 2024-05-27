import {
  CUKRepository
} from '@/backend/repository/cukRepository';
import {
  Message
} from '@/backend/entities/message/message';
import {
  MessageRepository
} from '@/backend/repository/messageRepository';
import {
  MessageStatus
} from '@/backend/entities/message/status';

/* When the cuk status is being updated, an empty message is created or updated the last empty message */
export async function updateLastMessage(message: Message, messageRepository: MessageRepository, cukRepository: CUKRepository): Promise<Message | Error> {
  
  if (!message.cukCode) {
    console.log("message error cukcode");
    return new Error('Invalid CUK');
  }
  
  /* Get Cuk */
  let fetchedCuk = await cukRepository.find({
    cukCode: [message.cukCode]
  });  
  
  /* Check last message attached to the CUK */
  if (fetchedCuk instanceof Error || fetchedCuk.length === 0) {
    return new Error('No CUK found');
  }

  let fetchedMessages = fetchedCuk[0].messages;

  if (!fetchedMessages) {
    fetchedMessages = [];
  }

  /* Sorts from newest to oldest */
  fetchedMessages = fetchedMessages.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) {
      return 0;
    } else if (a.createdAt === b.createdAt) {
      return 0;
    } else if (a.createdAt > b.createdAt) {
      return -1; 
    } else {
      return 1;
    }
  });

  /* If the last message is not empty, create a new empty one */
  if (fetchedMessages.length === 0 || fetchedMessages[0].getStatus) {
    console.log("error")
    return new Error('No empty message found');

    /* If the last message is empty, update the last message */
  } else {
    let messageToUpdate = fetchedMessages[0];

    message.id = messageToUpdate.id;


    console.log("unfo", message)
    const { parameters, id, receivedDate, receivedTime } = message;

    const newMessage = new Message()
    newMessage.id = id;
    newMessage.receivedDate = receivedDate;
    newMessage.receivedTime = receivedTime;
    newMessage.parameters = parameters;

     // Update the status of the message

      if (message.statusCode == MessageStatus.ENVIADO ){
          if (newMessage.setReceivedTime) {
              newMessage.setReceivedTime();
          }
          if (newMessage.setStatus) {
              newMessage.setStatus(MessageStatus.BANDEJA_DE_ENTRADA);
              newMessage.setStatus(MessageStatus.ENVIADO);
          }
  }

    messageRepository.update(newMessage);
  }

  return message;
}