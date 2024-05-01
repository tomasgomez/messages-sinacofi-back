import { Message } from "@/app/component/inbox-table/type";

export interface MortgageDischargeCard {
  id: string;
  name: string;
  description: string;
  creationDate: string;
  cukCode: string;
  foreclosureDate: string;
  channel: string;
  status: string;
  clientDni: string;
  clientName: string;
  institutionDestination: string;
  messages: Message[];
}

export interface CodeCardMortgageDischarge {
  cukCode: string;
  foreclosureDate: string;
  cukStatus: string;
}

export interface InforCardMortgageDischarge {
  channel: string;
  operationStatus: string;
  clientName: string;
  institutionDestination: string;
  clientDni: string;
  cukStatus: string;
}

export interface DataMortgageDischarge {
  codeData: CodeCardMortgageDischarge;
  InfoData: InforCardMortgageDischarge;
  messages: Message[];
  buttonDisabled: boolean;
}

export interface DataHeaderInfoModal {
  NSR?: number;
  messageCode: string;
  description: string;
  LSN?: number;
  sender: string;
  creationDate: string;
  creationTime: string;
  priority?: string;
  aunthetication: string;
}

interface ObjectInfoModal {
  accessor: string;
  label: string;
  value?: string;
}

export interface ChannelDetailsMSInfoModal extends ObjectInfoModal {
  accessor:
    | "emissionDate"
    | "channel"
    | "operationType"
    | "notaryRepertoire"
    | "repertoireDate"
    | "repertoireNumber"
    | "gentlemenInstitution"
    | "donDonaSociety"
    | "rutSeller"
    | "buyer"
    | "rutBuyer";
}

export interface PropertyDetailsMSInfoModal extends ObjectInfoModal {
  accessor:
    | "correspondingProperty"
    | "propertyDescription"
    | "commune"
    | "region"
    | "bank"
    | "buyer"
    | "mutualForUF"
    | "payableWithin"
    | "complementaryMutualForUF"
    | "cukCode"
    | "debsName"
    | "debtorRut"
    | "amountUF";
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

export interface Filter {
  label: string;
  value: string | null | undefined;
}
