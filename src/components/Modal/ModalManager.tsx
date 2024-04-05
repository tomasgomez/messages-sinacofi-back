import { createContext, useCallback, useContext, useState } from "react";

type initialModalStateType = {
  open: boolean,
  modalProps?: object | any,
  onOpen?: Function,
  onClose?: Function,
  ModalComponent: any
};

const initialModalState: initialModalStateType = {
  open: false,
  modalProps: {},
  onOpen: () => {},
  onClose: () => {},
  ModalComponent: null
};

export const ModalManagerContext = createContext(initialModalState);

export const useModalManager = ({ component, props }: { component: any, props?: object }) => {
  const { onOpen: onModalOpen, onClose } = useContext(ModalManagerContext);

  const onOpen = useCallback((newprops?: object) => {
    return onModalOpen && onModalOpen(component, { ...props, ...newprops });
  }, [component, props, onModalOpen]);

  return {
    onOpen,
    onClose,
  };
};

const ModalManagerProvider = ({ children }: { children: any}) => {
  const [modalState, setModalState] = useState<initialModalStateType>(initialModalState);

  const onOpen = useCallback((ModalComponent: any, modalProps?: object) => {
    setModalState((prev) => ({ ...prev, ModalComponent, open: true, modalProps }));
  }, [setModalState]);

  const onClose = useCallback(() => {
    setModalState((prev) => ({ ...prev, ModalComponent: null, open: false }));
  }, [setModalState]);

  return (
    <ModalManagerContext.Provider value={{ ...modalState, onOpen, onClose }}>
      {children}
      {modalState.open && <modalState.ModalComponent open={modalState.open} onClose={onClose} {...modalState.modalProps} />}
    </ModalManagerContext.Provider>
  );
};

export default ModalManagerProvider;
