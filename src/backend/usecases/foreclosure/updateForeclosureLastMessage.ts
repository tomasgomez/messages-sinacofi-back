import {
  CUKRepository
} from '@/backend/repository/cukRepository';
import {
  Message
} from '@/backend/entities/message/message';
import {
  MessageRepository
} from '@/backend/repository/messageRepository';

/* When the cuk status is being updated, an empty message is created or updated the last empty message */
export async function updateLastMessage(message: Message, messageRepository: MessageRepository, cukRepository: CUKRepository): Promise<Message | Error> {
  
  console.log(message);


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

  /* Set the receiver of the message */
  // message.origin = "";
  // message.destination = "";

  let fetchedMessages = fetchedCuk[0].messages;

  console.log("fetched", fetchedMessages)

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

  console.log("status:", fetchedMessages[0].getStatus)

  console.log(fetchedMessages[0].getStatus)
  console.log(fetchedMessages.length === 0)

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

    const response = await messageRepository.update(newMessage);
    console.log("errr");
    console.log(response);
  }

  return message;
}