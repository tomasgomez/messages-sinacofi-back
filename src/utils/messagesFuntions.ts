import { Message } from "@/app/component/inbox-table/type";

const parseDateTimeMessages = (obj: unknown): Date => {
  if (!obj || typeof obj !== "object" || !("creationDate" in obj)) {
    // if the object doesn't have a date property, return a date with the maximum possible value
    return new Date("9999-12-31T23:59:59.999Z");
  }
  const dateObj = obj as { creationDate: string; creationTime: string };
  const date = new Date(`${dateObj.creationDate} ${dateObj.creationTime}`);

  if (date.toString() === "Invalid Date") {
    // if the date is not a valid date property, return a date with the maximum possible value
    return new Date("9999-12-31T23:59:59.999Z");
  }

  return date;
};

export const sortMessagesOldToNew = (obj: Message[]): Message[] => {
  return obj.sort(
    (a, b) =>
      parseDateTimeMessages(a).getTime() - parseDateTimeMessages(b).getTime()
  );
};
