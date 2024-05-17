import {
  Message,
  MortgageDischargeData,
} from "@/app/component/inbox-table/type";

export interface MortgageDischargeCard extends MortgageDischargeData {}

export interface CodeCardMortgageDischarge {
  cukCode: string;
  foreclosureDate: string;
  cukStatus: string;
  lastMessageCode: string;
}

export interface InforCardMortgageDischarge {
  channel: string;
  operationStatus: string;
  buyer: string;
  institutionDestination: string;
  buyerDni: string;
  cukStatus: string;
}

// TODO change after backend changes
export interface ModalTrackingData {
  cukCode: string;
  seller: string;
  buyer: string;
  debtor: string;
  region: string;
  institutionDestination: string;
  history: any[];
}

export interface DataMortgageDischarge {
  codeData: CodeCardMortgageDischarge;
  infoData: InforCardMortgageDischarge;
  messages: Message[];
  buttonDisabled: boolean;
  modalTrackingData: ModalTrackingData;
}

export interface DataHeaderInfoModal {
  NSR?: number;
  messageCode: string;
  description: string;
  LSN?: number;
  receiver?: string;
  creationDate: string;
  creationTime: string;
  priority?: string;
  aunthetication: string;
}

interface ObjectInfoModal {
  accessor?: string;
  label?: string;
  value?: string;
}

export interface ChannelDetailsMSInfoModal extends ObjectInfoModal {
  accessor:
    | "issuedDate"
    | "channel"
    | "operationtype"
    | "notary"
    | "registrationDate"
    | "registrationNumber"
    | "beneficiaryBank"
    | "owner"
    | "ownerDni"
    | "buyer"
    | "buyerDni";
}

export interface PropertyDetailsMSInfoModal extends ObjectInfoModal {
  accessor:
    | "propertyInfo"
    | "E32"
    | "commune"
    | "region"
    | "bank"
    | "buyer"
    | "loan"
    | "loanTerm"
    | "addLoan"
    | "CUK"
    | "borrower"
    | "borrowerDni"
    | "ufAmount";
}

export interface BankDetailsMSInfoModal {
  bank: string;
  amountHeldByTheBank: string;
  debsName: string;
  debtorRut: string;
}
export interface InfoModalMortgageDischarge {
  dataHeader: DataHeaderInfoModal;
  channelDetailsMS: ChannelDetailsMSInfoModal[];
  propertyDetailsMS: PropertyDetailsMSInfoModal[];
  bankDetailsMS: BankDetailsMSInfoModal;
}

export interface SmallMsDetailInfoModal extends ObjectInfoModal {
  accessor:
    | "creationDate"
    | "observations"
    | "sign"
    | "debsName"
    | "debtorRut"
    | "requiresPrepaidSettlement"
    | "";
}

export interface SmallMsInfoModalMortgageDischarge {
  smallMsDetail: SmallMsDetailInfoModal[];
  dataHeader: DataHeaderInfoModal;
}

export interface Filter {
  label: string;
  value: string | null | undefined;
}
