import { useCallback, useContext, useState, createContext, Suspense, useMemo } from "react";
import { ModalList, ModalListImports } from "./ModalList";

type ModalStateType = {
  id: string;
  props: object | undefined | null;
};

type ModalType = {
  open: Function; // change the isOpen param as true
  close: Function; // change the isOpen param as false
};


const modalInitialValue = {
  open: () => {},
  close: () => {}
};
type ModalManagerContextType = {
  openModal: Function,
  closeModal: Function, 
  SuccessModal: ModalType,
  ConfirmModal: ModalType,
  ErrorModal: ModalType,
}

export const ModalManagerContext = createContext<ModalManagerContextType>({
  openModal: (id: string, props?: any) => {},
  closeModal: (id: string) => {},
  SuccessModal: modalInitialValue,
  ConfirmModal: modalInitialValue,
  ErrorModal: modalInitialValue,
});

export const useModalManager = () => {
  const { SuccessModal, ConfirmModal, ErrorModal } = useContext(ModalManagerContext);

  return {
    SuccessModal, ConfirmModal, ErrorModal
  };
}

export const useModal = ({ id, props }: { id: string | any; props?: any }) => {
  const { openModal, closeModal } = useContext(ModalManagerContext);

  const close = useCallback(() => closeModal(id), [closeModal]);

  const open = useCallback((nextProps: any) => {
    openModal(id, { ...props, ...nextProps });
  }, [openModal, close]);

  return {
    open,
    close,
  }
}

const ModalManagerProvider = ({ children }: { children: any}) => {
  const [modalManagerState, setModalManagerState] = useState/* <initialModalStateType> */({
    map: {},
  });

  const closeModal = useCallback((id: string) => {
    setModalManagerState((prev: any) => ({...prev, map: { ...prev.map, [id]: { open: false } }}));
  }, [setModalManagerState]);

  const openModal = useCallback((id: string, props?: any) => {
    setModalManagerState((prev: any) => ({
      ...prev,
      map: {
        ...prev.map,
        [id]: {
          ...props,
          open: true,
          onClose: () => {
            props.onClose && props.onClose();
            closeModal(id)
          }
        }
      } 
    }));
  }, [setModalManagerState, closeModal]);

  const ConfirmModal = useMemo(() => ({
    open: (props: any) => openModal(ModalList.ConfirmModal, props),
    close: () => closeModal(ModalList.ConfirmModal)
  }), [openModal, closeModal]);

  const SuccessModal = useMemo(() => ({
    open: (props: any) => openModal(ModalList.SuccessModal, props),
    close: () => closeModal(ModalList.SuccessModal)
  }), [openModal, closeModal]);

  const ErrorModal = useMemo(() => ({
    open: (props: any) => openModal(ModalList.ErrorModal, props),
    close: () => closeModal(ModalList.ErrorModal)
  }), [openModal, closeModal]);

  return (
    <ModalManagerContext.Provider value={{ openModal, closeModal, SuccessModal, ConfirmModal, ErrorModal }}>
      {children}
      {Object.entries(modalManagerState.map)?.map((modal: any) => {
        const ModalComponent = ModalListImports[modal[0]];
        return (
          modal[1].open && (
            <Suspense>
             <ModalComponent {...modal[1]} />
            </Suspense>
          )
        );
      })
      }
    </ModalManagerContext.Provider>
  );
};

export default ModalManagerProvider;