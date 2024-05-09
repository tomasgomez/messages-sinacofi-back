import institutions from "./mock-instititutions.json";
import { messagesTypes } from "../../utils/messagesSchemaTypes";
// import { messageSchemas } from "@/utils/messagesSchema";

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

export const getMessageSchema = async (messageCode: string, senderId: any, receiverId: any) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     const schema = messageSchemas.find((messageSchema) => messageSchema.messageCode === messageCode);
  //     if (!schema) {
  //       reject("Couln't find the form schema");
  //     }
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
  return fetch(`/api/rule/schema?messageCode=${messageCode}&senderId=${senderId}&receiverId=${receiverId}`)
    .then((response: any) => response.json())
  //   .then((response) => response.json())
  //   .then((schemas) => {
  //     console.log({ schemas });
  //     return schemas.messageSchemas.find((el: any) => el.messageCode === messageCode)
  //   });
};


export const getMessageDetails = async (messageId: number | string) => {
  return await fetch(`/api/message/detail?id=${messageId}`)
    .then(res => res.json())

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

export const updateMessage = async (id: string, status: string, data: any = {}) => {
  return fetch(
    `/api/message?id=${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: id, status }),
    }
  ).then((res) => res.json());
}
