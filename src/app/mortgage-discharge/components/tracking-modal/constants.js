export const options = [
  {
    label: "021 - Evaluación Alzamiento Hipotecario En Proceso",
    value: "021",
    dependOf: ["01", "YYY"],
    disabled: true,
  },
  {
    label: "022 - Evaluación Alzamiento Hipotecario Aceptada",
    value: "022",
    dependOf: ["01", "YYY", "021"],
    disabled: true,
  },
  {
    label: "023 - Evaluación Alzamiento Hipotecario Rechazada",
    value: "023",
    dependOf: ["01", "YYY", "021"],
    disabled: true,
  },
  {
    label: "XXX - Inicio de Cliente en Normalización",
    value: "XXX",
    dependOf: ["01", "YYY", "021"],
    disabled: true,
  },
  {
    label: "041 - Firma de Escritura en Proceso",
    value: "041",
    dependOf: ["022", "YYY"],
    disabled: true,
  },
  {
    label: "042 - Escritura Firmada",
    value: "042",
    dependOf: ["041"],
    disabled: true,
  },
  {
    label: "YYY - Fin de Cliente en Normalización",
    value: "YYY",
    dependOf: ["XXX"],
    disabled: true,
  },
];
