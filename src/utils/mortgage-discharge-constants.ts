import { SmallMsDetailInfoModal } from "@/types/mortgage-discharge";

export const paramsTo670 = [
  "dateOfApplication",
  "channel",
  "operationType",
  "notary",
  "repertoireDate",
  "repertoireNumber",
  "beneficiaryBank",
  "sellerName",
  "sellerDni",
  "buyerName",
  "buyerDni",
  "propertyInfo",
  "location",
  "region",
  "commune",
  "loanUF",
  "loanTerm",
  "supplementaryLoanUF",
  "CUK",
  "borrowerName",
  "borrowerDni",
  "borrowerUfAmount",
  "mlObservation",
];

// Delete label after backend fix label

export const paramsTo671: SmallMsDetailInfoModal[] = [
  // Array by row
  {
    // Array by column
    data: [
      [
        { name: "mlApprovalDate", label: "Fecha de Aceptación" },
        {
          name: "requiresPrepaidSettlement",
          label: "Requiere liquidación de Prepago Si/No",
        },
        { text: "Firma Electrónica Receptor" },
        { name: "receiverAHName", label: "Apoderado Nombre" },
        { name: "receiverAHDni", label: "Apoderado RUT" },
        { name: "mlApprovalObservation", label: "Observaciones" },
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
          { name: "mlRejectionDate", label: "Fecha de Rechazo" },
          { name: "rejectionReason", label: "Motivo" },
          { text: "Firma Electrónica Receptor" },
          { name: "senderName", label: "Apoderado Nombre" },
          { name: "senderDni", label: "Apoderado RUT" },
          { name: "mlRejectionObservation", label: "Observaciones" },
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
          { name: "mlNormalizationObservation", label: "Observaciones" },
          { name: "normalizationDate", label: "Fecha de Normalización" },
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
            name: "sellerName",
            label: "Nombre del Vendedor",
          },
          { name: "sellerDni", label: "RUT del Vendedor" },
          { name: "buyerName", label: "Nombre del Comprador" },
          { name: "buyerDni", label: "RUT del Comprador" },
          { name: "borrowerName", label: " Nombre del Deudor" },
          { name: "borrowerDni", label: "RUT del Deudor" },
          {
            name: "prepaymentSettlementRequestObservation",
            label: "Observaciones",
          },
        ],
        [
          {
            name: "OSN",
            label: "Número Recepción de Alzamiento (OSN)",
          },
          {
            name: "dateOfApplication",
            label: "Asociado a Alzamiento Hipotecario de Fecha",
          },
          { name: "NSE", label: "Número de Serie de Escritura (NSE)" },
          { name: "loanUF", label: "Monto del mutuo (UF)" },
          {
            name: "supplementaryLoanUF",
            label: "Un mutuo Complementario de (UF)",
          },
          {
            name: "borrowerUfAmount",
            label: "Monto del Pago Efectivo (U.F.)",
          },
          {
            name: "amountHeldByTheBank",
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
        { name: "mortgageCurrencyType", label: "Moneda" },
        { name: "capital", label: "Capital" },
        { name: "interest", label: "Intereses" },
      ],
      [
        { name: "mora", label: "Mora / I. Penal" },
        { name: "amortization", label: "Amortización" },
        { name: "prepaidCost", label: "Costo Prepago" },
        { name: "mortgageExpenses", label: "Gastos Alzamiento" },
        { name: "collectionCurrencyType", label: "Moneda(s)" },
        { name: "collection", label: "Cobranza" },
      ],
      [
        { name: "judicial", label: "G. Judiciales" },
        { name: "loanSubtotal", label: "Subtotal Préstamo" },
        { name: "dividendAmount", label: "Cantidad Dividendos" },
        { name: "totalCredit", label: "Monto Total ($)" },
        { name: "collectionExpenses", label: "Gastos de Cobranza" },
      ],
    ],
  },
  {
    // Title by column
    title: "Detalle Otros Creditos",
    // Array by column
    data: [
      [
        { name: "loanNumberOther", label: "N° de Préstamo" },
        { name: "typeOfObligationOther", label: "Tipo de Obligación" },
        { name: "typeOfDebtOther", label: "Tipo de Deuda" },
        { name: "mortgageCurrencyTypeOther", label: "Moneda" },
      ],
      [
        { name: "capitalOther", label: "Capital" },
        { name: "interestOther", label: "Intereses" },
        { name: "moraOther", label: "Mora / I. Penal" },
        { name: "collectionCurrencyTypeOther", label: "Moneda(s)" },
      ],
      [
        { name: "collectionOther", label: "Cobranza" },
        { name: "judicialOther", label: "G. Judiciales" },
        { name: "loanSubtotalOther", label: "Subtotal Préstamo" },
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
        { name: "totalPrepaidToPayCLP", label: "Total a Pagar CLP" },
        { name: "totalPrepaidToPayUF", label: "Total a Pagar UF" },
        { name: "mlApprovalObservation", label: "Observaciones" },
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
          { name: "loanUF", label: "Monto del Mutuo (U.F.)" },
          {
            name: "supplementaryLoanUF",
            label: "Monto del Mutuo Complementario (U.F.)",
          },
          { name: "borrowerUfAmount", label: "Monto del Pago Efectivo (U.F.)" },
          {
            name: "amountHeldByTheBank",
            label: "Monto Adicional Voluntario $",
          },
        ],
        [
          {
            name: "totalPrepaidToPayUF",
            label: "Monto U.F.",
          },
          {
            name: "totalPrepaidToPayCLP",
            label: "Monto $",
          },
          {
            name: "prepaymentSettlementRequestDate",
            label: "Fecha de Validez Liquidación de Prepago",
          },
          { name: "paymentDate", label: "Fecha de Pago" },
        ],
      ],
    },
    {
      // Array by column
      data: [
        [
          {
            name: "prepaymentSettlementRequestObservation",
            label: "Observaciones",
          },
        ],
      ],
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
            name: "totalPrepaidToPayUF",
            label: "Monto U.F.",
          },
          {
            name: "totalPrepaidToPayCLP",
            label: "Monto $",
          },
          {
            name: "prepaymentSettlementRequestDate",
            label: "Fecha de Validez Liquidación de Prepago",
          },
          { name: "paymentDate", label: "Fecha de Pago" },
        ],
        [
          { name: "totalAmountPaid", label: "Monto Pagado Total" },
          { name: "paymentMethod", label: "Medio de Pago" },
        ],
      ],
    },
    {
      // Array by column
      data: [[{ name: "noticeOfPaymentObservation", label: "Observaciones" }]],
    },
  ];

export const paramsTo678: SmallMsDetailInfoModal[] =
  // Array by row
  [
    {
      data: [
        [
          { name: "paymentDate", label: "Fecha de Pago" },
          { name: "rejectionReason", label: "Motivo del Rechazo del Pago" },
          { text: "Firma Electrónica Receptor" },
          { name: "receiverAHName", label: "Apoderado Nombre" },
          { name: "receiverAHDni", label: "Apoderado RUT" },
          { name: "noticeOfPaymentObservation", label: "Observaciones" },
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
          { name: "paymentDate", label: "Fecha de Pago" },
          { name: "SHA", label: "SHA" },
          { text: "Firma Electrónica Receptor" },
          { name: "receiverAHName", label: "Apoderado Nombre" },
          { name: "receiverAHDni", label: "Apoderado RUT" },
          { name: "noticeOfPaymentObservation", label: "Observaciones" },
        ],
      ],
    },
  ];

export const statusDictionary = {
  "01": "01 - Alzamiento Hipotecario Enviado",
  "021": "021 - Alzamiento Hipotecario en Proceso",
  "022": "022 - Evaluación Alzamiento Hipotecario Aceptada",
  "023": "023 - Evaluación Alzamiento Hipotecario Rechazada",
  XXX: "XXX - Inicio de Cliente en Normalización",
  YYY: "YYY - Fin de Cliente en Normalización",
  "041": "041 - Firma de Escritura en Proceso",
  "042": "042 - Escritura Firmada",
  "07": "07 - Aceptación Alzamiento Hipotecario",
  "09": "09 - Envio de Liquidacion de Prepago",
  "10": "10 - Aviso de Pago",
  "11": "11 - Pago de Operación",
  "12": "12 - Rechazo de Pago",
  "14": "14 - Aceptación de Pago",
};
