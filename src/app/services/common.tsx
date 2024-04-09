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
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(messagesTypes as []);
  //   }, 1000);
  // });
  // return fetch("/api/messageDescriptions").then((response) => response.json());
  return fetch("/api/rule").then((response) => response.json());
};

export const getMessageSchema = async (messageCode: string, institutionId: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const schema = messageSchemas.find((messageSchema) => messageSchema.messageCode === messageCode);
      resolve({
        ...schema,
        parameters: schema?.parameters.map((parameter) => (
          parameter.id === "institutionDestination" 
          ? { ...parameter, defaultValue: institutionId } 
          : parameter
        ))
      } as unknown as []);
    }, 1000);
  });
  // return fetch(`/api/rule/schema?messageCode=${messageCode}`)
  //   .then((response) => response.json())
  //   .then((schemas) => {
  //     console.log({ schemas });
  //     return schemas.messageSchemas.find((el: any) => el.messageCode === messageCode)
  //   });
};

export const createMessage = async (data: any, status: string) => {
  const payload = JSON.stringify({ ...data, status });
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     const schema = messageSchemas.find((messageSchema) => messageSchema.messageCode === messageCode);
  //     resolve({
  //       ...schema,
  //       parameters: schema?.parameters.map((parameter) => (
  //         parameter.id === "institutionDestination" 
  //         ? { ...parameter, defaultValue: institutionId } 
  //         : parameter
  //       ))
  //     } as unknown as []);
  //   }, 1000);
  // });
  return fetch(`/api/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: payload
  })
    .then((response) => response.json());
};
