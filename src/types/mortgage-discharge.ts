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
  destination?: string;
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

export interface DetailsMSInfoModal extends ObjectInfoModal {}

export interface BankDetailsMSInfoModal {
  bank: string;
  amountHeldByTheBank: string;
  sign_2: string;
}
export interface InfoModalMortgageDischarge {
  dataHeader: DataHeaderInfoModal;
  detailsMS: DetailsMSInfoModal[];
  bankDetailsMS: BankDetailsMSInfoModal;
  documents: any[];
}

export interface SmallMsDetailInfoModal {
  title?: string;
  data: ObjectInfoModal[][];
}

export interface SmallMsInfoModalMortgageDischarge {
  smallMsDetail: SmallMsDetailInfoModal[];
  dataHeader: DataHeaderInfoModal;
  documents: any[];
}

export interface Filter {
  label: string;
  value: string | null | undefined;
}
