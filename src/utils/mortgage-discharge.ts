import { Message } from "@/app/component/inbox-table/type";
import { Dispatch, SetStateAction } from "react";
import {
  BankDetailsMSInfoModal,
  ChannelDetailsMSInfoModal,
  DataHeaderInfoModal,
  PropertyDetailsMSInfoModal,
  InfoModalMortgageDischarge,
  MortgageDischargeCard,
  DataMortgageDischarge,
  Filter,
  SmallMsDetailInfoModal,
  SmallMsInfoModalMortgageDischarge,
  ModalTrackingData,
} from "@/types/mortgage-discharge";
import { sortMessagesOldToNew } from "./messagesFuntions";

const parseDateTimeMessages = (obj: any): Date => {
  return new Date(obj.date);
};

const sortHistoryList = (obj: any[]): any[] => {
  return obj.sort(
    (a, b) =>
      parseDateTimeMessages(b).getTime() - parseDateTimeMessages(a).getTime()
  );
};

export const formatCardData = (
  data: MortgageDischargeCard[]
): DataMortgageDischarge[] => {
  const formattedData = data.map((elem) => {
    let { messages: unSortedMessages } = elem;

    const messages = sortMessagesOldToNew(unSortedMessages);

    // To Mock Data

    // const mewMessages2: Message[] = [
    //   ...messages,
    //   ...messages,
    //   ...messages,
    //   ...messages,
    //   ...messages,
    //   ...messages,
    // ];

    // // Mock different status to test
    // const newMessages: Message[] = mewMessages2.map((message, i) => {
    //   const updatedMessage: Message = { ...message };

    //   if (i === 0) updatedMessage.messageCode = "670";
    //   if (i === 1) updatedMessage.messageCode = "672";
    //   if (i === 2) updatedMessage.messageCode = "670";
    //   if (i === 3) updatedMessage.messageCode = "672";
    //   if (i === 4) updatedMessage.messageCode = "670";
    //   if (i === 5) updatedMessage.messageCode = "671";
    //   if (i === 6) updatedMessage.messageCode = "674";

    //   if (i === 0) updatedMessage.status = "05";
    //   if (i === 1) updatedMessage.status = "06";
    //   if (i === 2) updatedMessage.status = "05";
    //   if (i === 3) updatedMessage.status = "06";
    //   if (i === 4) updatedMessage.status = "05";
    //   if (i === 5) updatedMessage.status = "06";
    //   if (i === 6) updatedMessage.status = "05";

    //   if (i === 0) updatedMessage.creationDate = "3/20/2024";
    //   if (i === 1) updatedMessage.creationDate = "4/1/2024";
    //   if (i === 2) updatedMessage.creationDate = "4/5/2024";
    //   if (i === 3) updatedMessage.creationDate = "4/15/2024";
    //   if (i === 4) updatedMessage.creationDate = "4/16/2024";
    //   if (i === 5) updatedMessage.creationDate = "4/17/2024";

    //   return updatedMessage;
    // });

    // messages = newMessages;
    const ListMessages670 = messages.filter(
      (message) => message?.messageCode === "670"
    );
    // The order of the messages is oldest to newest, (1,2,3,4) with respect to creation identifiers
    const mostRecent670 = ListMessages670[ListMessages670.length - 1];

    const buttonDisabled = mostRecent670?.status === "01";

    let cukCode = "01";
    let messageCode = "";
    for (let i = messages?.length - 1; i >= 0; i--) {
      if (messages[i].status && messages[i].status !== "-") {
        cukCode = messages[i].status;
        messageCode = messages[i].messageCode;
        break;
      }
    }

    const codeData = {
      cukCode: elem.cukCode,
      foreclosureDate: elem?.creationDate?.split(" ")[0],
      cukStatus: cukCode,
      lastMessageCode: messageCode,
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
      region: elem.region || "",
      institutionDestination: elem.institutionDestination || "",
      history: sortHistoryList(elem?.history || []),
    };

    return { codeData, infoData, messages, buttonDisabled, modalTrackingData };
  });

  return formattedData;
};

export const formatModalDetailsCompleted = (
  message: Message
): InfoModalMortgageDischarge => {
  const { parameters } = message;

  const dataHeader = formatModalInfoHeader(message);

  const channelDetailsMS: ChannelDetailsMSInfoModal[] = [
    { accessor: "emissionDate", label: "Fecha de Alzamiento" },
    { accessor: "channel", label: "Canal" },
    { accessor: "operationType", label: "Tipo de Operacion" },
    { accessor: "notaryRepertoire", label: "Notaria Repertorio" },
    { accessor: "repertoireDate", label: "Fecha Repertorio" },
    { accessor: "repertoireNumber", label: "Número Repertorio" },
    { accessor: "gentlemenInstitution", label: "Institución" },
    { accessor: "donDonaSociety", label: "Vendedor:" },
    { accessor: "rutSeller", label: "RUT de Vendedor" },
    { accessor: "buyer", label: "Comprador" },
    { accessor: "rutBuyer", label: "RUT de Comprador" },
  ];

  const propertyDetailsMS: PropertyDetailsMSInfoModal[] = [
    { accessor: "correspondingProperty", label: "Tipo de Inmueble" },
    {
      accessor: "propertyDescription",
      label: "Descripción del Inmueble",
    },
    { accessor: "commune", label: "Comuna" },
    { accessor: "region", label: "Region" },
    { accessor: "bank", label: "Institución" },
    { accessor: "buyer", label: "Comprador" },
    { accessor: "mutualForUF", label: "Monto del Mutuo" },
    { accessor: "payableWithin", label: "Plazo (años)" },
    {
      accessor: "complementaryMutualForUF",
      label: "Monto del Mutuo Complementario",
    },
    { accessor: "cukCode", label: "Código Interno" },
    { accessor: "debsName", label: "Deudor" },
    { accessor: "debtorRut", label: "RUT del Deudor" },
    { accessor: "amountUF", label: "Monto UF" },
  ];

  const bankDetailsMS: BankDetailsMSInfoModal = {
    bank: "",
    amountHeldByTheBank: "",
    debsName: "",
    debtorRut: "",
  };

  parameters?.forEach((parameter) => {
    const channelIndex = channelDetailsMS.findIndex(
      (detail) => detail.accessor === parameter.name
    );
    if (channelIndex !== -1) {
      channelDetailsMS[channelIndex].value = parameter.value;
    }
    // Only is the parameters is not part of the detailsMSCanal
    else {
      const propertyIndex = propertyDetailsMS.findIndex(
        (detail) => detail.accessor === parameter.name
      );
      if (propertyIndex !== -1) {
        propertyDetailsMS[propertyIndex].value = parameter.value;
      }
      // Comparte datos con PropertyIndex por eso va en el else y no dentro de otro if
      if (parameter.name in bankDetailsMS) {
        (bankDetailsMS as any)[parameter.name] = parameter.value;
      }
    }
  });

  return { dataHeader, channelDetailsMS, propertyDetailsMS, bankDetailsMS };
};

export const formatModalDetailSmall = (
  message: Message
): SmallMsInfoModalMortgageDischarge => {
  const { messageCode, creationDate, parameters } = message;

  const dataHeader = formatModalInfoHeader(message);

  // Get all data necessary of the parameters
  const auxiliarSmallMsDetail: SmallMsDetailInfoModal[] = [
    { accessor: "observations", label: "Observaciones" },
    { accessor: "sign", label: "Firma Electrónica Receptor" },
    {
      accessor: "requiresPrepaidSettlement",
      label: "Requiere Liquidación de Pre Pago",
    },
    {
      accessor: "debsName",
      label: "Apoderado Nombre",
    },
    {
      accessor: "debtorRut",
      label: "RUT",
    },
  ];

  parameters?.forEach((parameter) => {
    const dataIndex = auxiliarSmallMsDetail.findIndex(
      (detail) => detail.accessor === parameter.name
    );
    if (dataIndex !== -1) {
      auxiliarSmallMsDetail[dataIndex].value = parameter.value;
    }
  });

  // Modify the array to the necessary format data
  const smallMsDetail: SmallMsDetailInfoModal[] = [
    { accessor: "", label: checkMessageDate(messageCode), value: creationDate },
    auxiliarSmallMsDetail[2],
    auxiliarSmallMsDetail[1],
    {
      accessor: "",
      label: "Apoderado Nombre, RUT",
      value: `${auxiliarSmallMsDetail[3]?.value || "N/A"} ${
        auxiliarSmallMsDetail[4].value || "N/A"
      }`,
    },
    auxiliarSmallMsDetail[0],
  ];
  return { dataHeader, smallMsDetail };
};

const formatModalInfoHeader = (message: Message): DataHeaderInfoModal => {
  const {
    NSR,
    messageCode,
    description,
    LSN,
    sender,
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
    sender,
    creationDate,
    creationTime,
    priority,
    aunthetication: parameters?.find((elem: any) => elem.name === "auth")
      ?.value as string,
  };

  return dataHeader;
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

const checkMessageDate = (messageCode: string) => {
  switch (messageCode) {
    // "Alzamiento Hipotecario"
    case "670":
      return "Fecha de Alzamiento";

    // Aceptación AH
    case "671":
      return "Fecha de Aceptación";

    // Rechazo AH
    case "672":
      return "Fecha de Rechazo";

    // Aviso Cliente en Normalización
    case "673":
      return "Fecha de Normalización";

    // Solicitud Liquidación Prepago
    case "674":
      return "Fecha de Solicitud de Liquidación Prepago";

    // Liquidación Prepago
    case "675":
      return "Fecha de Liquidación Prepago";

    // Datos para el Pago AH
    case "676":
      return "Fecha de Datos para el Pago";

    // Aviso de Pago
    case "677":
      return "Fecha de Aviso de Pago";

    // Rechazo de Pago
    case "678":
      return "Fecha de Rechazo de Pago";

    // Aceptación de Pago
    case "679":
      return "Fecha de Aceptación de Pago";

    // Otro caso
    default:
      return "";
  }
};
