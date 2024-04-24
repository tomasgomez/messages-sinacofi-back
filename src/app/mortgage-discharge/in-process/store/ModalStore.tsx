import { handleGenericChangeFilter } from "@/utils/mortgage-discharge";
import React, { createContext, useState } from "react";

type initialCardContextStateType = {
  modalIsOpen: boolean;
  setModalIsOpen: Function;
  filters: any[];
  handleChangeAddFilter: Function;
};

const initialCardContextState: initialCardContextStateType = {
  modalIsOpen: false,
  setModalIsOpen: () => {},
  filters: [],
  handleChangeAddFilter: () => {},
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

  const handleChangeAddFilter = (
    label: string,
    value: string | null | undefined
  ) => {
    handleGenericChangeFilter(label, value, setFilters);
  };

  const contextValue = React.useMemo(
    () => ({ modalIsOpen, setModalIsOpen, filters, handleChangeAddFilter }),
    [modalIsOpen, setModalIsOpen, filters, handleChangeAddFilter]
  );

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
};
