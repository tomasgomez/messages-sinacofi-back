import React, { createContext, useState  } from "react";

type initialModalContextStateType = {
  isOpen: boolean,
  setIsOpen: Function,
};

const initialModalContextState: initialModalContextStateType = {
    isOpen: false,
    setIsOpen: () => {}
};

export const ModalContext = createContext(initialModalContextState);

export const ModalContextProvider = ({ children }: { children: any}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const contextValue = React.useMemo(() => ({isOpen, setIsOpen}),[isOpen, setIsOpen]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
