import {
  SmallMsDetailInfoModal,
  SmallMsInfoModalMortgageDischarge,
} from "@/types/mortgage-discharge";

export const paramsTo670 = [
  { accessor: "issuedDate", label: "Fecha de Alzamiento" },
  { accessor: "channel", label: "Canal" },
  { accessor: "operationtype", label: "Tipo de Operacion" },
  { accessor: "notary", label: "Notaria Repertorio" },
  { accessor: "registrationDate", label: "Fecha Repertorio" },
  { accessor: "registrationNumber", label: "Número Repertorio" },
  { accessor: "beneficiaryBank_2", label: "Institución" },
  { accessor: "owner", label: "Vendedor:" },
  { accessor: "ownerDni", label: "RUT de Vendedor" },
  { accessor: "buyer", label: "Comprador" },
  { accessor: "buyerDni", label: "RUT de Comprador" },
  { accessor: "propertyInfo", label: "Tipo de Inmueble" },
  {
    accessor: "E32",
    label: "Descripción del Inmueble",
  },
  { accessor: "commune", label: "Comuna" },
  { accessor: "region", label: "Region" },
  { accessor: "bank", label: "Institución" },
  { accessor: "loan", label: "Monto del Mutuo" },
  { accessor: "loanTerm", label: "Plazo (años)" },
  {
    accessor: "addLoan",
    label: "Monto del Mutuo Complementario",
  },
  { accessor: "CUK", label: "Código Interno" },
  { accessor: "borrower", label: "Deudor" },
  { accessor: "borrowerDni", label: "RUT del Deudor" },
  { accessor: "ufAmount", label: "Monto UF" },
];

export const paramsTo671: SmallMsDetailInfoModal[] = [
  // Array by row
  {
    // Array by column
    data: [
      [
        { accessor: "approvalDate", label: "Fecha de Aceptación" },
        {
          accessor: "prepaidSettlement",
          label: "Requiere liquidación de Prepago Si/No",
        },
        { accessor: "linebreak_6", label: "Firma Electrónica Receptor" },
        { accessor: "sign_2", label: "Apoderado Nombre, RUT" },
        { accessor: "observations", label: "Observaciones" },
      ],
    ],
  },
];

export const paramsTo672: SmallMsDetailInfoModal[] =
  // Array by row
  [
    {
      // Array by column
      data: [
        [
          { accessor: "rejectionDate", label: "Fecha de Rechazo" },
          { accessor: "rejectionReason", label: "Motivo" },
          { accessor: "linebreak_6", label: "Firma Electrónica Receptor" },
          { accessor: "sign_2", label: "Apoderado Nombre, RUT" },
          { accessor: "observations", label: "Observaciones" },
          { accessor: "E32_3", label: "E32" },
        ],
      ],
    },
  ];

export const paramsTo673: SmallMsDetailInfoModal[] =
  // Array by row
  [
    {
      // Array by column
      data: [
        [
          { accessor: "normalizationDate", label: "Fecha de Rechazo" },
          { accessor: "openText", label: "Observaciones" },
          { accessor: "E32_3", label: "E32" },
        ],
      ],
    },
  ];

export const paramsTo674: SmallMsDetailInfoModal[] =
  // Array by row
  [
    {
      // Title by column
      title: "Solicitamos a usted liquidación de pre-pago consolidada de",
      // Array by column
      data: [
        [
          {
            accessor: "owner",
            label: "Nombre del Vendedor",
          },
          { accessor: "ownerDni", label: "RUT del Vendedor" },
          { accessor: "buyer", label: "Nombre del Comprador" },
          { accessor: "buyerDni", label: "RUT del Comprador" },
          { accessor: "borrower", label: " Nombre del Deudor" },
          { accessor: "borrowerDni", label: "RUT del Deudor" },
          { accessor: "observations", label: "Observaciones" },
          { accessor: "E32_674", label: "E32" },
        ],
        [
          {
            accessor: "mortgageLiftingReceptionNumber",
            label: "Número Recepción de Alzamiento (OSN)",
          },
          {
            accessor: "issuedDate_2",
            label: "Asociado a Alzamiento Hipotecario de Fecha/NSE",
          },
          { accessor: "loan", label: "Monto del mutuo (UF)" },
          { accessor: "addLoan", label: "Un mutuo Complementario de (UF)" },
          {
            accessor: "cashPaymentAmount",
            label: "Monto del Pago Efectivo (U.F.)",
          },
          {
            accessor: "voluntaryAdditionalAmount",
            label: "Monto Adicional Voluntuario $",
          },
          { accessor: "observations", label: "Observaciones" },
        ],
      ],
    },
  ];

export const paramsTo675: SmallMsDetailInfoModal[] = [
  // Array by row
  {
    // Title by column
    title: "Detalle Credito Hipotecario",
    // Array by column
    data: [
      [{ accessor: "issuedDate", label: "Fecha de Liquidación Prepago" }],
      [{ accessor: "issuedDate2", label: "Fecha de Liquidación Prepago" }],
      [{ accessor: "issuedDate3", label: "Fecha de Liquidación Prepago" }],
    ],
  },
  {
    // Title by column
    title: "Detalle Credito Hipotecario 2",
    // Array by column
    data: [
      [{ accessor: "issuedDate", label: "Fecha de Liquidación Prepago" }],
      [{ accessor: "issuedDate2", label: "Fecha de Liquidación Prepago" }],
      [{ accessor: "issuedDate3", label: "Fecha de Liquidación Prepago" }],
    ],
  },
];

// const checkMessageDate = (messageCode) => {
//   switch (messageCode) {
//     // "Alzamiento Hipotecario"
//     case "670":
//       return "Fecha de Alzamiento";

//     // Aceptación AH
//     case "671":
//       return "Fecha de Aceptación";

//     // Rechazo AH
//     case "672":
//       return "Fecha de Rechazo";

//     // Aviso Cliente en Normalización
//     case "673":
//       return "Fecha de Normalización";

//     // Solicitud Liquidación Prepago
//     case "674":
//       return "Fecha de Solicitud de Liquidación Prepago";

//     // Liquidación Prepago
//     case "675":
//       return "Fecha de Liquidación Prepago";

//     // Datos para el Pago AH
//     case "676":
//       return "Fecha de Datos para el Pago";

//     // Aviso de Pago
//     case "677":
//       return "Fecha de Aviso de Pago";

//     // Rechazo de Pago
//     case "678":
//       return "Fecha de Rechazo de Pago";

//     // Aceptación de Pago
//     case "679":
//       return "Fecha de Aceptación de Pago";

//     // Otro caso
//     default:
//       return "";
//   }
// };
