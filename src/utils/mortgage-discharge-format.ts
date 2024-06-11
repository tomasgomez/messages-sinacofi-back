import { Message } from "@/app/component/inbox-table/type";
import {
  BankDetailsMSInfoModal,
  DetailsMSInfoModal,
  DataHeaderInfoModal,
  InfoModalMortgageDischarge,
  DataMortgageDischarge,
  SmallMsInfoModalMortgageDischarge,
  ModalTrackingData,
} from "@/types/mortgage-discharge";
import { MortgageDischargeData } from "@/app/component/inbox-table/type";
import { sortMessagesOldToNew } from "./messagesFuntions";
import { paramsTo670 } from "./mortgage-discharge-constants";
import {
  sortHistoryList,
  getActions,
  getDetailsObjetToMSCode,
} from "./mortgage-discharge-utils";

const formatModalInfoHeader = (
  message: Partial<Message> = {}
): DataHeaderInfoModal => {
  const {
    NSR = "",
    messageCode = "",
    description = "",
    LSN = "",
    destination = "",
    creationDate = "",
    creationTime = "",
    priority = "",
    parameters = [],
  } = message;

  const dataHeader: DataHeaderInfoModal = {
    NSR,
    messageCode,
    description,
    LSN,
    destination,
    creationDate,
    creationTime,
    priority,
    aunthetication:
      parameters?.find((elem: any) => elem.name === "auth")?.value || "",
  };

  return dataHeader;
};

export const formatCardData = (
  data: MortgageDischargeData[] | undefined
): DataMortgageDischarge[] => {
  if (!data) return [];

  const formattedData = data?.map((elem) => {
    let { messages: unSortedMessages = [] } = elem;

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

    let lastMessageStatusWithStatus = ""; // "01"
    let lastMessageCodeWithStatus = "";

    for (let i = messages?.length - 1; i >= 0; i--) {
      if (messages[i].status && messages[i].status !== "-") {
        lastMessageStatusWithStatus = messages[i].status;
        lastMessageCodeWithStatus = messages[i].messageCode;
        break;
      }
    }

    const codeData = {
      cukCode: elem?.cukCode || "",
      foreclosureDate: elem?.creationDate?.split(" ")[0] || "",
      cukStatus: lastMessageStatusWithStatus,
      lastMessageCode: lastMessageCodeWithStatus,
    };

    const infoData = {
      channel: elem?.channel || "",
      operationStatus: elem?.status || "",
      buyer: elem?.buyer || "",
      institutionDestination: elem?.institutionDestination || "",
      institutionCode: elem?.institutionCode || "",
      buyerDni: elem?.buyerDni || "",
      cukStatus: codeData?.cukStatus || "",
    };

    const modalTrackingData: ModalTrackingData = {
      cukCode: elem.cukCode || "",
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
        actions: getActions(
          message?.messageCode || "",
          message?.status || "",
          elem?.status || ""
        ),
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
  message: Partial<Message> = {}
): InfoModalMortgageDischarge => {
  const { parameters = [], documents = [] } = message;

  const dataHeader = formatModalInfoHeader(message);

  const detailsMS: DetailsMSInfoModal[] = [];

  const bankDetailsMS: BankDetailsMSInfoModal = {
    bank: "",
    amountHeldByTheBank: "",
    sign_2: "",
  };

  parameters.forEach((parameter) => {
    if (parameter?.name in bankDetailsMS) {
      (bankDetailsMS as any)[parameter?.name] = parameter?.value;
    }
    if (paramsTo670.includes(parameter.name)) {
      detailsMS.push({
        label: parameter?.label,
        value: parameter?.value || "",
      });
    }
  });

  return { dataHeader, detailsMS, bankDetailsMS, documents };
};

export const formatModalDetailSmall = (
  message: Partial<Message> = {}
): SmallMsInfoModalMortgageDischarge => {
  const { messageCode = undefined, parameters = [], documents = [] } = message;

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
          (param) => param.name === column.name
        );
        if (parameter) {
          column.value = parameter.value;
          if (parameter?.label) column.label = parameter?.label;
          //Delete after backend fix
          // else column.label = parameter.name;
        }
      });
    });
  });

  // Modify the array to the necessary format data
  return { dataHeader, smallMsDetail, documents };
};
