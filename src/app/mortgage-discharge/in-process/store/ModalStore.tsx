import { handleGenericChangeFilter } from "@/utils/mortgage-discharge";
import React, { createContext, useCallback, useState } from "react";
import { Message } from "@/app/component/inbox-table/type";

type initialCardContextStateType = {
  modalIsOpen: boolean;
  setModalIsOpen: Function;
  filters: any[];
  handleChangeAddFilter: Function;
  selectedMessage: Message | null;
  setSelectedMessage: Function;
};

const initialCardContextState: initialCardContextStateType = {
  modalIsOpen: false,
  setModalIsOpen: () => {},
  filters: [{ label: "channel", value: "Personas" }],
  handleChangeAddFilter: () => {},
  selectedMessage: null,
  setSelectedMessage: () => {},
};

export const CardContext = createContext(initialCardContextState);

export const CardContextProvider = ({
  filters,
  setFilters,
  children,
}: {
  filters: any;
  setFilters: any;
  children: any;
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleChangeAddFilter = useCallback(
    (label: string, value: string | null | undefined) => {
      handleGenericChangeFilter(label, value, setFilters);
    },
    [setFilters]
  );

  const contextValue = React.useMemo(
    () => ({
      modalIsOpen,
      setModalIsOpen,
      filters,
      handleChangeAddFilter,
      selectedMessage,
      setSelectedMessage,
    }),
    [
      modalIsOpen,
      setModalIsOpen,
      filters,
      handleChangeAddFilter,
      selectedMessage,
      setSelectedMessage,
    ]
  );

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
};
