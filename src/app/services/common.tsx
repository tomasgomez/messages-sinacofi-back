import institutions from "./mock-instititutions.json";
import { messagesTypes } from "../../utils/messagesSchemaTypes";
import { messageSchemas } from "@/utils/messagesSchema";

export const getInstitutions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(institutions as []);
    }, 1000);
  });
  // return fetch("/api/institution").then((response) => response.json());
};

export const getMessageDescriptions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(messagesTypes as []);
    }, 1000);
  });
  // return fetch("/api/messageDescriptions").then((response) => response.json());
};
