import {
  Alignment,
  Columns,
  RowOptions,
} from "@/app/component/inbox-table/type";

export const columnsInformsAccepted: Columns[] = [
  {
    id: "cukCode",
    label: "Codigo Interno",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "institutionCode",
    label: "Institución Origen",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "institutionDestination",
    label: "Institución Destino",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "channel",
    label: "Tipo de Operación",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "notary",
    label: "Notaria",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "repertoireNumber",
    label: "N° Repertorio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "registrationDate",
    label: "Fecha Repertorio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "buyerDni",
    label: "RUT Comprador",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "borrowerDni",
    label: "RUT Deudor",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationDate",
    label: "Fecha de Envio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationTime",
    label: "Hora de Envio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSE",
    label: "NSE",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "recievedDate",
    label: "Fecha de Recepción",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "recievedTime",
    label: "Hora de Recepción",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "NSR",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "rejectedCount",
    label: "Rechazo N°",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "resendCreationDate",
    label: "Fecha del Último rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "resendCreationTime",
    label: "Hora del Último rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "lastRejectedMessageNumber",
    label: "N° del Último Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "resendCreationDate",
    label: "Fecha del Re Envío",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "resendCreationTime",
    label: "Hora del Re Envío",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "resendMessageNumber",
    label: "N° del Re Envío",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "acceptedCreationDate",
    label: "Fecha de Aceptacion",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "acceptedCreationTime",
    label: "Hora de Aceptacion",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "acceptedMessageNumber",
    label: "N° de Aceptacion",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "signedReceivedDate",
    label: "Fecha de Escritura Firmada",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "signedReceivedTime",
    label: "Hora de Escritura Firmada",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "liquidationCreationDate",
    label: "Fecha de 1era Solic. de Liquidación",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "liquidationCreationTime",
    label: "Hora de 1era Solic. de Liquidación",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "liquiidationMessageNumber",
    label: "N° de 1era Solic. de Liquidación",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "confirmationCreationDate",
    label: "Fecha de Confirmación de Pago",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "confirmationCreationTime",
    label: "Hora de Confirmación de Pago",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "confirmationMessageNumber",
    label: "N° de Confirmación de Pago",
    align: Alignment.LEFT,
    sortable: false,
  },
];

export const columnsInformsRejected: Columns[] = [
  {
    id: "cukCode",
    label: "Codigo Interno",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "institutionCode",
    label: "Institución Origen",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "institutionDestination",
    label: "Institución Destino",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "messageCode",
    label: "Código de Mensaje",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationDate",
    label: "Fecha de Envio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationTime",
    label: "Hora de Envio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSE",
    label: "NSE",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "recievedDate",
    label: "Fecha de Recepcion",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "recievedTime",
    label: "Hora de Recepcion",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "NSR",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "channel",
    label: "Tipo de Operación",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "notary",
    label: "Notaria",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "repertoireNumber",
    label: "N° Repertorio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "repertorieDate",
    label: "Fecha Repertorio",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "rejectedMessageCode",
    label: "Codigo del Mensaje de Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "rejectedCreationDate",
    label: "Fecha de Envio del Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "rejectedCreationTime",
    label: "Hora de Envio del Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "rejectedNSE",
    label: "NSE del Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "rejectedRecievedDate",
    label: "Fecha de Recepción del Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "rejectedCreationTime",
    label: "Hora de Recepción del Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "rejectedNSR",
    label: "NSR del Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "sellerDNI",
    label: "RUT Vendedor",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "buyerDni",
    label: "RUT Comprador",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "borrowerDni",
    label: "RUT Deudor",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "rejectionReason",
    label: "Motivo de Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "observations",
    label: "Detalle del Rechazo",
    align: Alignment.LEFT,
    sortable: false,
  },
];

export const rowOptions: RowOptions = {};
