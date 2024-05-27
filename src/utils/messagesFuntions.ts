import { Message } from "@/app/component/inbox-table/type";

const parseDateTimeMessages = (obj: Message): Date => {
  const dateTimeString = `${obj.creationDate} ${obj.creationTime}`;
  return new Date(dateTimeString);
};

export const sortMessagesOldToNew = (obj: Message[]): Message[] => {
  return obj.sort(
    (a, b) =>
      parseDateTimeMessages(a).getTime() - parseDateTimeMessages(b).getTime()
  );
};
