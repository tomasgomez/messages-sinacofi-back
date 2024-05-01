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
} from "@/types/mortgage-discharge";

export const formatCardData = (
  data: MortgageDischargeCard[]
): DataMortgageDischarge[] => {
  const formattedData = data.map((elem) => {
    let { messages } = elem;

    // To Mock Data

    // const mewMessages2: Message[] = [
    //   ...messages,
    //   ...messages,
    //   ...messages,
    //   ...messages,
    // ];

    // // Mock different status to test
    // const newMessages: Message[] = mewMessages2.map((message, i) => {
    //   const updatedMessage: Message = { ...message };

    //   if (i === 0) updatedMessage.messageCode = "670";
    //   if (i === 1) updatedMessage.messageCode = "671";
    //   if (i === 2) updatedMessage.messageCode = "670";
    //   if (i === 3) updatedMessage.messageCode = "672";

    //   if (i === 0) updatedMessage.status = "05";
    //   if (i === 1) updatedMessage.status = "05";
    //   if (i === 2) updatedMessage.status = "06";
    //   if (i === 3) updatedMessage.status = "05";

    //   if (i === 0) updatedMessage.creationDate = "3/20/2024";
    //   if (i === 1) updatedMessage.creationDate = "4/7/2024";
    //   if (i === 2) updatedMessage.creationDate = "5/5/2024";
    //   if (i === 3) updatedMessage.creationDate = "4/5/2024";

    //   return updatedMessage;
    // });

    // messages = newMessages;

    const ListMessages670 = messages.filter(
      (message) => message?.messageCode === "670"
    );
    const { latest: mostRecent670 } = getExtremeDateObjects(ListMessages670);

    const buttonDisabled = mostRecent670?.status === "01";

    const codeData = {
      cukCode: elem.cukCode,
      foreclosureDate: elem.foreclosureDate,
      cukStatus: messages.length ? messages[messages.length - 1].status : "01",
    };

    const InfoData = {
      channel: elem.channel,
      operationStatus: elem.status,
      clientName: elem.clientName,
      institutionDestination: elem.institutionDestination,
      clientDni: elem.clientDni,
      cukStatus: codeData.cukStatus,
    };

    return { codeData, InfoData, messages, buttonDisabled };
  });

  return formattedData;
};

export const formatModalDetailsData = (
  message: Message
): InfoModalMortgageDischarge => {
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
    aunthetication: parameters?.find(
      (elem: any) => elem.name === "authetication"
    ).value as string,
  };

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

export const getIsPendingStatus = (status: string | undefined) => {
  if (!status || status === "01") {
    return true;
  }
  return false;
};

export function getExtremeDateObjects(objects: any[]) {
  if (objects.length === 0) {
    return {
      latest: null,
      oldest: null,
    };
  }

  let latestDate = new Date(objects[0].creationDate);
  let oldestDate = new Date(objects[0].creationDate);
  let latestObject = objects[0];
  let oldestObject = objects[0];

  for (let i = 1; i < objects.length; i++) {
    const currentDate = new Date(objects[i].creationDate);
    if (currentDate > latestDate) {
      latestDate = currentDate;
      latestObject = objects[i];
    } else if (currentDate < oldestDate) {
      oldestDate = currentDate;
      oldestObject = objects[i];
    }
  }

  return {
    latest: latestObject,
    oldest: oldestObject,
  };
}
