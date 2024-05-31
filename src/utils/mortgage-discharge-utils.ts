import { Dispatch, SetStateAction } from "react";
import { getOnlyTheValue } from "./tracking-modal";
import {
  paramsTo671,
  paramsTo672,
  paramsTo673,
  paramsTo674,
  paramsTo675,
} from "./mortgage-discharge-constants";
import { Filter } from "@/types/mortgage-discharge";
import { Message } from "@/app/component/inbox-table/type";

const parseDateTimeMessages = (obj: unknown): Date => {
  if (!obj || typeof obj !== "object" || !("date" in obj)) {
    // if the object doesn't have a date property, return a date with 0 value
    return new Date(0);
  }
  const dateObj = obj as { date: string };
  const date = new Date(dateObj?.date);

  if (date.toString() === "Invalid Date") {
    // if the date is not a valid date property, return a date with 0 value
    return new Date(0);
  }

  return date;
};

export const sortHistoryList = (obj?: unknown[]): unknown[] => {
  if (!obj || !Array.isArray(obj)) {
    return [];
  }
  return obj.sort(
    (a, b) =>
      parseDateTimeMessages(b).getTime() - parseDateTimeMessages(a).getTime()
  );
};

// Use the getActions until backend sent the actions array
export const getActions = (
  messageCode: string,
  statusMessage: string,
  statusCuk: string
) => {
  if (messageCode === "676") {
    return statusMessage === "06" ? ["print"] : ["details"];
  }
  if (statusMessage === "01") {
    if (messageCode === "670") {
      if (getOnlyTheValue(statusCuk) === "023") return ["details", "edit"];
      return ["sing"];
    }
    return ["sent"];
  }
  if (!statusMessage || statusMessage === "-") {
    return ["sent"];
  }
  if (statusMessage === "06" || statusMessage === "05") {
    return ["details"];
  }
  return [];
};

export const getDetailsObjetToMSCode = (messageCode?: string) => {
  if (messageCode === "671") return paramsTo671;
  if (messageCode === "672") return paramsTo672;
  if (messageCode === "673") return paramsTo673;
  if (messageCode === "674") return paramsTo674;
  if (messageCode === "675") return paramsTo675;
  if (messageCode === "676") return [];
  if (messageCode === "677") return [];
  if (messageCode === "678") return [];
  if (messageCode === "679") return [];
  return [];
};

export const handleGenericChangeFilter = (
  label: string,
  value: string | null | undefined,
  setAuxFilters: Dispatch<SetStateAction<Filter[]>>
): void => {
  setAuxFilters((prevFilters) => {
    if (value === "" || value === null || value === undefined) {
      return prevFilters.filter((filter) => filter.label !== label);
    }
    const existingFilterIndex = prevFilters.findIndex(
      (filter) => filter.label === label
    );
    if (existingFilterIndex !== -1) {
      const updatedFilters = [...prevFilters];
      updatedFilters[existingFilterIndex] = { label, value };
      return updatedFilters;
    }
    return [...prevFilters, { label, value }];
  });
};

export function findPreviousMessage670(
  originalArray: Message[],
  id: string
): Message | null {
  if (!originalArray || !id) return null;
  const currentIndex = originalArray.findIndex((object) => object.id === id);
  if (currentIndex === -1) {
    return null;
  }
  let previousMessage = originalArray[currentIndex - 1];
  while (previousMessage && previousMessage.messageCode !== "670") {
    previousMessage = originalArray[originalArray.indexOf(previousMessage) - 1];
  }
  return previousMessage || originalArray[currentIndex];
}

export const getStatusText = (
  status?: string,
  messageCode?: string
): string => {
  switch (status) {
    // Recibido
    case "06":
      return "Recibido";
    // Enviado
    case "05":
      return "Enviado";
    // Pendiente de Firma
    case "01":
      if (messageCode === "670") {
        return "Pendiente de Firma";
      }
      return "Pendiente de Envío";
    // Default
    default:
      return "Pendiente de Envio";
  }
};
export const getIsPendingStatus = (status: string | undefined) => {
  if (!status || status === "01" || status === "-") {
    return true;
  }
  return false;
};

export const isMortgageDischargeMessage = (messageCode: string) =>
  [
    "670",
    "671",
    "672",
    "673",
    "674",
    "675",
    "676",
    "677",
    "678",
    "679",
  ].includes(messageCode);

export const withRadioButton = (row: Message) =>
  ["678", "679"].includes(row?.messageCode) && row.status === "";
