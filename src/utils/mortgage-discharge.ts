import { Message } from "@/app/component/inbox-table/type";
import { Dispatch, SetStateAction } from "react";
import {
  BankDetailsMSInfoModal,
  DetailsMSInfoModal,
  DataHeaderInfoModal,
  InfoModalMortgageDischarge,
  MortgageDischargeCard,
  DataMortgageDischarge,
  Filter,
  SmallMsDetailInfoModal,
  SmallMsInfoModalMortgageDischarge,
  ModalTrackingData,
} from "@/types/mortgage-discharge";
import { sortMessagesOldToNew } from "./messagesFuntions";
import { getOnlyTheValue } from "./tracking-modal";
import {
  paramsTo670,
  paramsTo671,
  paramsTo672,
  paramsTo673,
  paramsTo674,
  paramsTo675,
} from "./mortgage-discharge-constants";

const parseDateTimeMessages = (obj: any): Date => {
  return new Date(obj.date);
};

export const sortHistoryList = (obj: any[]): any[] => {
  return obj.sort(
    (a, b) =>
      parseDateTimeMessages(b).getTime() - parseDateTimeMessages(a).getTime()
  );
};

// Use the getActions until backend sent the actions array
const getActions = (
  messageCode: string,
  statusMessage: string,
  statusCuk: string
) => {
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
  // if to test
  // if (messageCode === "670" && getOnlyTheValue(statusCuk) === "023") {
  //   return ["details", "edit"];
  // }
  if (statusMessage === "06" || statusMessage === "05") {
    return ["details"];
  }
};

const formatModalInfoHeader = (message: Message): DataHeaderInfoModal => {
  const {
    NSR,
    messageCode,
    description,
    LSN,
    receiver,
    creationDate,
    creationTime,
    priority,
    parameters,
  } = message;

  const dataHeader: DataHeaderInfoModal = {
    NSR,
    messageCode,
    description,
    LSN,
    receiver,
    creationDate,
    creationTime,
    priority,
    aunthetication: parameters?.find((elem: any) => elem.name === "auth")
      ?.value as string,
  };

  return dataHeader;
};

const getDetailsObjetToMSCode = (messageCode: string) => {
  if (messageCode === "670") return [];
  if (messageCode === "671") return paramsTo671;
  if (messageCode === "672") return paramsTo672;
  if (messageCode === "673") return paramsTo673;
  if (messageCode === "674") return paramsTo674;
  if (messageCode === "675") return paramsTo675;

  return [];
};

export const formatCardData = (
  data: MortgageDischargeCard[]
): DataMortgageDischarge[] => {
  const formattedData = data.map((elem) => {
    let { messages: unSortedMessages } = elem;

    let messages = sortMessagesOldToNew(unSortedMessages);

    // // To Mock Data

    // const mewMessages2: Message[] = [
    //   messages[0],
    //   messages[0],
    //   messages[0],
    //   messages[0],
    // ];

    // // Mock different status to test
    // const newMessages: Message[] = mewMessages2.map((message, i) => {
    //   const updatedMessage: Message = { ...message };

    //   if (i === 0) updatedMessage.messageCode = "670";
    //   if (i === 1) updatedMessage.messageCode = "671";
    //   if (i === 2) updatedMessage.messageCode = "674";
    //   if (i === 3) updatedMessage.messageCode = "675";
    //   // if (i === 4) updatedMessage.messageCode = "670";
    //   // if (i === 5) updatedMessage.messageCode = "671";
    //   // if (i === 6) updatedMessage.messageCode = "674";

    //   if (i === 0) updatedMessage.status = "06";
    //   if (i === 1) updatedMessage.status = "05";
    //   if (i === 2) updatedMessage.status = "06";
    //   if (i === 3) updatedMessage.status = "05";

    //   if (i === 0) updatedMessage.actions = ["details"];
    //   if (i === 1) updatedMessage.actions = ["details"];
    //   if (i === 2) updatedMessage.actions = ["sent"];
    //   if (i === 3) updatedMessage.actions = ["sent"];
    //   // if (i === 4) updatedMessage.status = "05";
    //   // if (i === 5) updatedMessage.status = "06";
    //   // if (i === 6) updatedMessage.status = "05";

    //   if (i === 0) updatedMessage.creationDate = "3/20/2024";
    //   if (i === 1) updatedMessage.creationDate = "4/1/2024";
    //   if (i === 2) updatedMessage.creationDate = "4/5/2024";
    //   if (i === 3) updatedMessage.creationDate = "4/15/2024";
    //   // if (i === 4) updatedMessage.creationDate = "4/16/2024";
    //   // if (i === 5) updatedMessage.creationDate = "4/17/2024";

    //   return updatedMessage;
    // });

    // messages = newMessages;

    const ListMessages670 = messages.filter(
      (message) => message?.messageCode === "670"
    );

    // The order of the messages is oldest to newest, (1,2,3,4) with respect to creation identifiers
    const mostRecent670 = ListMessages670[ListMessages670.length - 1];

    const buttonDisabled = mostRecent670?.status === "01";

    let lastMessageStatusWithStatus = "01";
    let lastMessageCodeWithStatus = "";
    for (let i = messages?.length - 1; i >= 0; i--) {
      if (messages[i].status && messages[i].status !== "-") {
        lastMessageStatusWithStatus = messages[i].status;
        lastMessageCodeWithStatus = messages[i].messageCode;
        break;
      }
    }

    const codeData = {
      cukCode: elem.cukCode,
      foreclosureDate: elem?.creationDate?.split(" ")[0],
      cukStatus: lastMessageStatusWithStatus,
      lastMessageCode: lastMessageCodeWithStatus,
    };

    const infoData = {
      channel: elem.channel,
      operationStatus: elem.status,
      buyer: elem.buyer,
      institutionDestination: elem.institutionDestination,
      buyerDni: elem.buyerDni,
      cukStatus: codeData.cukStatus,
    };

    const modalTrackingData: ModalTrackingData = {
      cukCode: elem.cukCode,
      seller: `${elem?.ownerDni || ""} ${elem?.owner || ""}`,
      buyer: `${elem?.buyerDni || ""} ${elem?.buyer || ""}`,
      debtor: `${elem?.borrowerDni || ""} ${elem?.borrower || ""}`,
      region: elem?.region || "",
      institutionDestination: elem?.institutionDestination || "",
      history: sortHistoryList(elem?.history || []),
    };

    const newMessaje = messages.map((message) => {
      return {
        ...message,
        actions: getActions(message.messageCode, message.status, elem.status),
      };
    });

    return {
      codeData,
      infoData,
      messages: newMessaje,
      buttonDisabled,
      modalTrackingData,
    };
  });

  return formattedData;
};

export const formatModalDetailsCompleted = (
  message: Message
): InfoModalMortgageDischarge => {
  const { parameters, documents } = message;
  const dataHeader = formatModalInfoHeader(message);

  const detailsMS: DetailsMSInfoModal[] = paramsTo670;

  const bankDetailsMS: BankDetailsMSInfoModal = {
    bank: "",
    amountHeldByTheBank: "",
    sign_2: "",
  };

  parameters?.forEach((parameter) => {
    if (parameter.name in bankDetailsMS) {
      (bankDetailsMS as any)[parameter.name] = parameter.value;
    }
    detailsMS.forEach((detailElem: any) => {
      if (detailElem.accessor === parameter.name) {
        detailElem.value = parameter.value;
        return;
      }
    });
  });

  return { dataHeader, detailsMS, bankDetailsMS, documents: documents || [] };
};

export const formatModalDetailSmall = (
  message: Message
): SmallMsInfoModalMortgageDischarge => {
  const { messageCode, parameters, documents } = message;

  const dataHeader = formatModalInfoHeader(message);

  // Get all data necessary of the parameters
  const smallMsDetail: any[] = getDetailsObjetToMSCode(messageCode);

  // while by row
  smallMsDetail.forEach((rowElement: any) => {
    const data = rowElement.data;
    // while by  columna
    data.forEach((columnsElements: any) => {
      // while by  element
      columnsElements.forEach((column: any) => {
        const parameter = parameters?.find(
          (param) => param.name === column.accessor
        );
        if (parameter) {
          column.value = parameter.value;
        }
      });
    });
  });

  // Modify the array to the necessary format data
  return { dataHeader, smallMsDetail, documents: documents || [] };
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
  const currentIndex = originalArray.findIndex((object) => object.id === id);

  if (currentIndex === -1) {
    return null; // Retorna null si el objeto con el ID proporcionado no se encuentra
  }

  let previousMessage = originalArray[currentIndex - 1];

  while (previousMessage && previousMessage.messageCode !== "670") {
    previousMessage = originalArray[originalArray.indexOf(previousMessage) - 1];
  }

  return previousMessage || originalArray[currentIndex]; // Retorna el mensaje previo si se encuentra, de lo contrario retorna null
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
