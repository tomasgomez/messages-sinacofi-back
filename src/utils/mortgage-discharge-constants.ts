import { SmallMsDetailInfoModal } from "@/types/mortgage-discharge";

export const paramsTo670 = [
  "issuedDate",
  "channel",
  "operationtype",
  "notary",
  "registrationDate",
  "registrationNumber",
  "beneficiaryBank",
  "owner",
  "ownerDni",
  "buyer",
  "buyerDni",
  "propertyInfo",
  "morePropertyInfo",
  "location",
  "region",
  "commune",
  "bank",
  "loan",
  "loanTerm",
  "addLoan",
  "CUK",
  "borrowerName",
  "borrowerDni",
  "ufAmount",
];

// Delete label after backend fix label

export const paramsTo671: SmallMsDetailInfoModal[] = [
  // Array by row
  {
    // Array by column
    data: [
      [
        { name: "approvalDate", label: "Fecha de Aceptación" },
        {
          name: "prepaidSettlement",
          label: "Requiere liquidación de Prepago Si/No",
        },
        { text: "Firma Electrónica Receptor" },
        { name: "sign", label: "Apoderado Nombre, RUT" },
        { name: "observations", label: "Observaciones" },
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
          { name: "rejectionDate", label: "Fecha de Rechazo" },
          { name: "rejectionReason", label: "Motivo" },
          { text: "Firma Electrónica Receptor" },
          { name: "sign", label: "Apoderado Nombre, RUT" },
          { name: "observations", label: "Observaciones" },
          { name: "E32", label: "E32" },
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
          {
            name: "normalizationDate",
            label: "Fecha de Aviso de Cliente en  Normalización:",
          },
          { name: "openText", label: "Observaciones" },
          { name: "observations", label: "E32" },
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
            name: "owner",
            label: "Nombre del Vendedor",
          },
          { name: "ownerDni", label: "RUT del Vendedor" },
          { name: "buyer", label: "Nombre del Comprador" },
          { name: "buyerDni", label: "RUT del Comprador" },
          { name: "borrowerName", label: " Nombre del Deudor" },
          { name: "borrowerDni", label: "RUT del Deudor" },
          { name: "observations", label: "Observaciones" },
          { name: "moreObservations", label: "E32" },
        ],
        [
          {
            name: "mortgageLiftingReceptionNumber",
            label: "Número Recepción de Alzamiento (OSN)",
          },
          {
            name: "issuedDate",
            label: "Asociado a Alzamiento Hipotecario de Fecha/NSE",
          },
          { name: "loan", label: "Monto del mutuo (UF)" },
          { name: "addLoan", label: "Un mutuo Complementario de (UF)" },
          {
            name: "cashPaymentAmount",
            label: "Monto del Pago Efectivo (U.F.)",
          },
          {
            name: "voluntaryAdditionalAmount",
            label: "Monto Adicional Voluntuario $",
          },
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
      [
        { name: "loanNumber", label: "N° Préstamo" },
        { name: "typeOfObligation", label: "Tipo Obligación" },
        { name: "typeOfDebt", label: "Tipo de Deuda" },
        { name: "typeOfCurrency", label: "Moneda" },

        { name: "capital", label: "Capital" },
        { name: "interest", label: "Intereses" },
      ],
      [
        { name: "mora", label: "Mora / I. Penal" },
        { name: "amortization", label: "Amortización" },
        { name: "prepaidCost", label: "Costo Prepago" },
        { name: "liftingExpenses", label: "Gastos Alzamiento" },
        { name: "currency", label: "Moneda(s)" },
        { name: "collection", label: "Cobranza" },
      ],
      [
        { name: "judicial", label: "G. Judiciales" },
        { name: "loanSubtotal", label: "Subtotal Préstamo" },
        { name: "dividendAmount", label: "Cantidad Dividendos" },
        { name: "totalAmount", label: "Monto Total ($)" },
        { name: "collectionExpenses", label: "Gastos de Cobranza" },
      ],
    ],
  },
  // TODO ADD NEW COLUMNS
  // {
  //   // Title by column
  //   title: "Detalle Otros Créditos 1",
  //   // Array by column
  //   data: [],
  // },
  {
    data: [
      [
        { name: "totalToPay", label: "Total a Pagar UF / $" },
        { name: "observations", label: "Observaciones" },
        { name: "E32", label: "E32" },
      ],
    ],
  },
];

export const paramsTo676: SmallMsDetailInfoModal[] =
  // Array by row
  [
    {
      // Array by column
      data: [
        [
          { name: "loan", label: "Monto del Mutuo (U.F.)" },
          {
            name: "amountUfValidDatePrepaymentLiquidation",
            label: "Monto del Mutuo Complementario (U.F.)",
          },
          { name: "addLoan", label: "Monto del Pago Efectivo (U.F.)" },
          {
            name: "amountCLPValidDatePrepaymentLiquidation",
            label: "Monto Adicional Voluntario $",
          },
        ],
        [
          {
            name: "cashPaymentAmount",
            label: "Monto U.F. / Fecha de Validez Liquidación de Prepago",
          },
          {
            name: "paymentDay",
            label: "Monto $ / Fecha de Validez Liquidación de Prepago",
          },
          { name: "voluntaryAdditionalAmount", label: "Fecha de Pago" },
        ],
      ],
    },
    {
      // Array by column
      data: [[{ name: "E32", label: "E32" }]],
    },
  ];

export const paramsTo677: SmallMsDetailInfoModal[] =
  // Array by row
  [
    {
      // Array by column
      data: [
        [
          {
            name: "amountUfValidDatePrepaymentLiquidation",
            label: "Monto U.F. / Fecha de Validez Liquidación de Prepago",
          },
          {
            name: "amountCLPValidDatePrepaymentLiquidation",
            label: "Monto $ / Fecha de Validez Liquidación de Prepago",
          },
          { name: "paymentDay", label: "Fecha de Pago" },
        ],
        [
          { name: "totalPaymentAmount", label: "Monto Pagado Total" },
          { name: "paymentMethod", label: "Medio de Pago" },
        ],
      ],
    },
    {
      // Array by column
      data: [
        [
          { name: "observations", label: "Observaciones" },
          { name: "E32", label: "E32" },
        ],
      ],
    },
  ];

export const paramsTo678: SmallMsDetailInfoModal[] =
  // Array by row
  [
    {
      data: [
        [
          { name: "paymentDay", label: "Fecha de Pago" },
          { name: "rejectionReason", label: "Motivo del Rechazo del Pago" },
          { text: "Firma Electrónica Receptor" },
          { name: "sign", label: "Apoderado Nombre, RUT" },
          { name: "observations", label: "Observaciones" },
          { name: "E32", label: "E32" },
        ],
      ],
    },
  ];

export const paramsTo679: SmallMsDetailInfoModal[] =
  // Array by row
  [
    {
      // Array by column
      data: [
        [
          { name: "paymentDay", label: "Fecha de Pago" },
          { name: "SHA", label: "SHA" },
          { text: "Firma Electrónica Receptor" },
          { name: "sign", label: "Apoderado Nombre, RUT" },
          { name: "observations", label: "Observaciones" },
          { name: "E32", label: "E32" },
        ],
      ],
    },
  ];
