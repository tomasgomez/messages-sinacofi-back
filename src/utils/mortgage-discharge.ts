interface MessageMortgageDischarge {
  id: string;
  messageCode: string;
  description: string;
  title: string;
  status: string;
  parameters: {
    name: string;
    label: string;
    value: string;
    displayFormat?: string;
  }[];
}

interface MortgageDischarge {
  messages: MessageMortgageDischarge[];
}

interface FormatDataMortgageDischarge {
  id: string;
  messageCode: string;
  description: string;
  title: string;
  status: string;
  [key: string]: any;
}

export const formatData = (
  data: MortgageDischarge
): FormatDataMortgageDischarge[] => {
  const { messages } = data;

  const formattedData: FormatDataMortgageDischarge[] = messages.map(
    (message) => {
      const extraValues: { [key: string]: any } = {};
      message.parameters.forEach((elem) => {
        if (elem?.displayFormat) extraValues[elem?.name] = elem.displayFormat;
        else extraValues[elem?.name] = elem.value;
      });

      return {
        id: message.id,
        messageCode: message.messageCode,
        description: message.description,
        title: message.title,
        status: message.status,
        ...extraValues,
      };
    }
  );

  return formattedData;
};

import { Dispatch, SetStateAction } from "react";

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
