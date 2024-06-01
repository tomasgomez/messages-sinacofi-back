import { lazy } from "react";

interface Map {
  [key: string]: string
};

export const ModalList: Map = {
  ConfirmModal: "ConfirmModal",
  ErrorModal: "ErrorModal",
  SuccessModal: "SuccessModal",
  CreateIndividualMessageModal: "CreateIndividualMessageModal",
  AddFileModal: "AddFileModal",
};

export const ModalListImports = {
  [ModalList.ConfirmModal]: lazy(() => import("./ConfirmModal")),
  [ModalList.ErrorModal]: lazy(() => import("./ErrorModal")),
  [ModalList.SuccessModal]: lazy(() => import("./SuccessModal")),
  [ModalList.CreateIndividualMessageModal]: lazy(() => import("../SideBar/CreateIndividualMessageModal")),
  [ModalList.AddFileModal]: lazy(() => import("@/app/component/modal-add-file")),
};