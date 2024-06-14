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
  return fetch("/api/rule").then((response) => response.json());
};

export const getMessageSchema = async (
  messageCode: string,
  messageId?: string,
  cukCode?: string
) => {
  return fetch(
    `/api/rule/schema?messageCode=${messageCode}&messageId=${messageId}&cukCode=${cukCode}`
  ).then((response: any) => response.json());
};

export const getMessageDetails = async (messageId: number | string) => {
  return await fetch(`/api/message/detail?id=${messageId}`).then((res) =>
    res.json()
  );
};
export const createMessage = async (data: any, status: string) => {
  const payload = JSON.stringify({ ...data, status });
  return fetch(`/api/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((response) => response.json());
};

export const signMessage = async (
  id: string,
  status: string,
  data: any = {}
) => {
  try {
    const response = await fetch(`/api/message/sign?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: id, status }),
    });

    if (!response.ok) {
      let err = new Error(`Error: ${response.status} ${response.statusText}`) as any;
      err.status = response.status;
      throw err;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error signing message:", error);
    throw error;
  }
};

export const updateMessage = async (
  id: string,
  status: string,
  data: any = {}
) => {
  return fetch(`/api/message?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, id: id, status }),
  }).then((res) => res.json());
};

export const getMessage = async (params: {
  status?: string;
  destination?: string;
  origin?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.status) {
      queryParams.append("status", params.status);
    }

    if (params?.destination) {
      queryParams.append("destination", params.destination);
    }

    if (params?.origin) {
      queryParams.append("origin", params.origin);
    }

    const url = `/api/message?${queryParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return [];
    }

    const data = await response?.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch message details:", error);
    throw error;
  }
};


export const validatePassword = async (password: string) => {
  try {
    const response = await fetch(`/api/message/${password}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ ...data, id: id, status }),
    });

    if (!response.ok) {
      let err = new Error(`Error: ${response.status} ${response.statusText}`) as any;
      err.status = response.status;
      throw err;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error with password:", error);
    throw error;
  }
};