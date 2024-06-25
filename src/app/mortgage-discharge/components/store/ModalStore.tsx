import { handleGenericChangeFilter } from "@/utils/mortgage-discharge-utils";
import React, { createContext, useCallback, useState } from "react";
import { Message } from "@/app/component/inbox-table/type";
import { ModalTrackingData } from "@/types/mortgage-discharge";

type initialMortgageDischargeContextStateType = {
  modalIsOpen: boolean;
  setModalIsOpen: Function;
  filters: any[];
  handleChangeAddFilter: Function;
  selectedMessage: Message | null;
  setSelectedMessage: Function;
  isOpenTrackingModal: boolean;
  setIsOpenTrackingModal: (state: boolean) => void;
  modalTrackingData: ModalTrackingData | null;
  setModalTrackingData: Function;
};

const initialMortgageDischargeContextState: initialMortgageDischargeContextStateType =
  {
    modalIsOpen: false,
    setModalIsOpen: () => {},
    filters: [{ label: "channel", value: "Personas" }],
    handleChangeAddFilter: () => {},
    selectedMessage: null,
    setSelectedMessage: () => {},
    isOpenTrackingModal: false,
    setIsOpenTrackingModal: () => {},
    modalTrackingData: null,
    setModalTrackingData: () => {},
  };

export const MortgageDischargeContext = createContext(
  initialMortgageDischargeContextState
);

export const MortgageDischargeContextProvider = ({
  filters = [],
  setFilters = () => {},
  children,
}: {
  filters?: any;
  setFilters?: any;
  children: any;
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isOpenTrackingModal, setIsOpenTrackingModal] = useState(false);
  const [modalTrackingData, setModalTrackingData] =
    useState<ModalTrackingData | null>(null);

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
      isOpenTrackingModal,
      setIsOpenTrackingModal,
      modalTrackingData,
      setModalTrackingData,
    }),
    [
      modalIsOpen,
      setModalIsOpen,
      filters,
      handleChangeAddFilter,
      selectedMessage,
      setSelectedMessage,
      isOpenTrackingModal,
      setIsOpenTrackingModal,
      modalTrackingData,
      setModalTrackingData,
    ]
  );

  return (
    <MortgageDischargeContext.Provider value={contextValue}>
      {children}
    </MortgageDischargeContext.Provider>
  );
};
