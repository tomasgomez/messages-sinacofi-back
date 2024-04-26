import { Message } from "@/app/component/inbox-table/type";
import { Dispatch, SetStateAction } from "react";

interface MortgageDischargeCard {
  id: string;
  name: string;
  description: string;
  creationDate: string;
  cukCode: string;
  foreclosureDate: string;
  channel: string;
  status: string;
  clientDni: string;
  clientName: string;
  institutionDestination: string;
  messages: Message[];
}

export interface CodeCardMortgageDischarge {
  cukCode: string;
  foreclosureDate: string;
  cukStatus: string;
}

export interface InforCardMortgageDischarge {
  channel: string;
  operationStatus: string;
  clientName: string;
  institutionDestination: string;
}

interface DataMortgageDischarge {
  codeData: CodeCardMortgageDischarge;
  InfoData: InforCardMortgageDischarge;
  messages: Message[];
  buttonDisabled: boolean;
}

export const formatData = (
  data: MortgageDischargeCard[]
): DataMortgageDischarge[] => {
  const formattedData = data.map((elem) => {
    const { messages } = elem;

    const codeData = {
      cukCode: elem.cukCode,
      foreclosureDate: elem.foreclosureDate,
      cukStatus: elem.messages.length ? elem.messages[elem.messages.length - 1].status : "01",
    };

    const InfoData = {
      channel: elem.channel,
      operationStatus: elem.status,
      clientName: elem.clientName,
      institutionDestination: elem.institutionDestination,
    };

    // // Mock different status to test
    // const newMessage: Message[] = messages.map((message, i) => {
    //   const updatedMessage: Message = { ...message };
    //   if (i === 3) updatedMessage.status = "05";
    //   if (i === 2) updatedMessage.status = "06";
    //   if (i === 1) updatedMessage.status = "05";
    //   if (i === 0) updatedMessage.status = "01";
    //   return updatedMessage;
    // });

    const buttonDisabled =
      messages.find((message) => message?.messageCode === "670")?.status ===
      "01";

    return { codeData, InfoData, messages, buttonDisabled };
  });

  return formattedData;
};

interface Filter {
  label: string;
  value: string | null | undefined;
}

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

export const getStatusText = (status?: string): string => {
  switch (status) {
    // Recibido
    case "06":
      return "Recibido";
    // Enviado
    case "05":
      return "Enviado";
    // Pendiente de Firma
    case "01":
      return "Pendiente de Firma";
    // Default
    default:
      return "Pendiente de Envio";
  }
};

export const getIsPendingStatus = (status: string) => {
  if (!status || status === "01") {
    return true;
  }
  return false;
};
