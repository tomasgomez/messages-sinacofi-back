import {
  HistoryTrackingModal,
  Message,
} from "@/app/component/inbox-table/type";
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

const SortAndGetLastMessage = (
  messages: Message[],
  filterMessageCode: string
) => {
  let sortedMessages = sortMessagesOldToNew(messages);
  const ListMessages = messages.filter(
    (message) => message?.messageCode === filterMessageCode
  );

  // The order of the messages is oldest to newest, (1,2,3,4) with respect to creation identifiers
  const mostRecentMessage = ListMessages[ListMessages.length - 1];

  return { sortedMessages, mostRecentMessage };
};

const formatTrackingData = (
  data: MortgageDischargeData,
  sortedMessages: Message[]
) => {
  const {
    cukCode,
    ownerDni,
    owner,
    buyerDni,
    buyer,
    borrowerDni,
    borrower,
    region,
    institutionDestination,
    history,
  } = data || {};

  const modalTrackingData: ModalTrackingData = {
    cukCode: cukCode || "",
    seller: `${ownerDni || ""} ${owner || ""}`,
    buyer: `${buyerDni || ""} ${buyer || ""}`,
    debtor: `${borrowerDni || ""} ${borrower || ""}`,
    region: region || "",
    institutionDestination: institutionDestination || "",
    history: sortHistoryList(history || []),
    lastMessage: sortedMessages[sortedMessages?.length - 1] || {},
  };

  return modalTrackingData;
};

export const formatCardData = (
  data: MortgageDischargeData[] | undefined
): DataMortgageDischarge[] => {
  if (!data) return [];

  const formattedData = data?.map((elem) => {
    let { messages: unSortedMessages = [], status: cukStatus } = elem;

    const { sortedMessages, mostRecentMessage: mostRecent670 } =
      SortAndGetLastMessage(unSortedMessages, "670");

    const buttonDisabled = mostRecent670?.status === "01";

    let lastMessageStatusWithStatus = "";
    let lastMessageCodeWithStatus = "";

    for (let i = sortedMessages?.length - 1; i >= 0; i--) {
      if (sortedMessages[i].status && sortedMessages[i].status !== "-") {
        lastMessageStatusWithStatus = sortedMessages[i].status;
        lastMessageCodeWithStatus = sortedMessages[i].messageCode;
        break;
      }
    }

    const codeData = {
      cukCode: elem?.cukCode || "",
      foreclosureDate: elem?.creationDate?.split(" ")[0] || "",
      lasMessageStatus: lastMessageStatusWithStatus,
      cukStatus: cukStatus || "",
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

    return {
      codeData,
      infoData,
      messages: sortedMessages,
      buttonDisabled,
      modalTrackingData: formatTrackingData(elem, sortedMessages),
    };
  });
  return formattedData;
};

export const formatDeedsReportsData = (
  data: MortgageDischargeData[] | undefined
): any[] => {
  if (!data) return [];

  const formattedData = data?.map((elem) => {
    let {
      messages: unSortedMessages = [],
      cukCode = "",
      institutionDestination = "",
      buyerDni = "",
      ownerDni = "",
    } = elem || {};

    const { mostRecentMessage: mostRecent670 } = SortAndGetLastMessage(
      unSortedMessages,
      "670"
    );
    const { mostRecentMessage: mostRecent672 } = SortAndGetLastMessage(
      unSortedMessages,
      "672"
    );

    const { documents: documents672 } = mostRecent672 || {};
    const { creationDate, creationTime, documents } = mostRecent670 || {};

    const documentGP = documents?.find((doc) => {
      return doc?.documentName?.startsWith("GP-");
    });

    const documentCM = documents?.find((doc) => {
      return doc?.documentName?.startsWith("CM-");
    });

    const documentR = documents672?.find((doc) => {
      return doc?.documentName?.startsWith("R-");
    });

    return {
      cukCode,
      institutionDestination,
      buyerDni,
      ownerDni,
      creationDate,
      creationTime,
      documentGP: documentGP,
      documentCM: documentCM,
      documentR: documentR,
    };
  });

  return formattedData;
};

export const formatSearchData = (
  data: MortgageDischargeData[] | undefined
): any[] => {
  if (!data) return [];

  const formattedData = data?.map((elem) => {
    let {
      messages: unSortedMessages = [],
      cukCode = "",
      history = [],
    } = elem || {};

    const { sortedMessages, mostRecentMessage: mostRecent670 } =
      SortAndGetLastMessage(unSortedMessages, "670");

    const sorttedHistory = sortHistoryList(history);

    const lastHistory: HistoryTrackingModal =
      sorttedHistory[0] as HistoryTrackingModal;

    const {
      OSN,
      receivedDate,
      status: status670,
      id: message670ID = "",
    } = mostRecent670 || {};

    const { status: historyStatus = "", date: dateTime } = lastHistory || {};

    let dateHistory = "";

    if (dateTime) {
      const dateObj = new Date(dateTime);
      dateHistory = dateObj.toISOString().split("T")[0];
    }

    return {
      cukCode,
      receivedDate,
      historyStatus,
      dateHistory,
      OSN,
      status670,
      message670ID,
      modalTrackingData: formatTrackingData(elem, sortedMessages),
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
