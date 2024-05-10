export const options = [
  {
    label: "021 - Evaluación Alzamiento Hipotecario En Proceso",
    value: "021",
  },
  { label: "022 - Evaluación Alzamiento Hipotecario Aceptada", value: "022" },
  {
    label: "023 - Evaluación Alzamiento Hipotecario Rechazada",
    value: "023",
  },
  { label: "041 - Firma de Escritura en Proceso", value: "041" },
  { label: "XXX - Inicio de Cliente en Normalización", value: "XXX" },
];

export const extraOptions = [
  {
    label: "042 - Escritura Firmada",
    value: "042",
    dependOf: "022",
    disabled: true,
  },
  {
    label: "YYY - Fin de Cliente en Normalización",
    value: "YYY",
    dependOf: "XXX",
    disabled: true,
  },
];
