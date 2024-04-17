import { MortgageDischargeData } from "@/app/component/inbox-table/type";

export const mockDataAllCases: MortgageDischargeData[] = [
  {
    NSR: "",
    code: "674",
    description: "Solicitud Liquidación de Prepago",
    LSN: "",
    date: "",
    time: "",
    status: "",
    isPending: true,
    messageStatus: "Pendiente de Firma",
    actions: true,
  },
  {
    NSR: "42938",
    code: "671",
    description: "Aceptación Alzamiento Hipotecario",
    LSN: "13929",
    date: "18/01/2024",
    time: "11:00:00",
    status: "06",
    isPending: false,
    messageStatus: "Recibido",
    actions: true,
  },
  {
    NSR: "42924",
    code: "670",
    description: "Alzamiento Hipotecario",
    LSN: "12994",
    date: "17/01/2024",
    time: "12:00:00",
    status: "01",
    isPending: false,
    messageStatus: "Enviado",
    actions: true,
  },
];

export const mockData: MortgageDischargeData[] = [
  {
    NSR: "42924",
    code: "670",
    description: "Alzamiento Hipotecario",
    LSN: "12994",
    date: "17/01/2024",
    time: "12:00:00",
    status: "01",
    isPending: true,
    messageStatus: "Pendiente de Firma",
    actions: true,
  },
];
