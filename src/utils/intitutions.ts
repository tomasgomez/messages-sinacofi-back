const institutionsList = [
  {
    id: "350",
    fullName: "HIPOTECARIA SECURITY PRINCIPAL S.A",
    rut: "965383107",
    name: "SEC.PRINCI",
    areaCode: "200",
  },
  {
    name: "CORP BANCA",
    id: "0027",
  },
  {
    id: "729",
    fullName: "SOCIEDAD EMISORA DE TARJETAS LOS HEROES S.A.",
    rut: "769657371",
    name: "LOS HEROES",
    areaCode: "200",
  },
  {
    id: "600",
    fullName: "INKAS TRANSPORTE DE VALORES SPA",
    rut: "76820781K",
    name: "INKAS ETV",
    areaCode: "200",
  },
  {
    id: "732",
    fullName: "LOS ANDES TARJETAS DE PREPAGO S.A.",
    rut: "769657444",
    name: "TAPP",
    areaCode: "200",
  },
  {
    id: "730",
    fullName: "TENPO PREPAGO S.A.",
    rut: "769676929",
    name: "TENPO SA",
    areaCode: "200",
  },
  {
    id: "265",
    fullName: "DEPOSITO CENTRAL DE VALORES",
    rut: "966661402",
    name: "D.C.V.",
    areaCode: "200",
  },
  {
    id: "601",
    fullName: "BRINK'S CHILE S.A.",
    rut: "864318002",
    name: "BRINK'S",
    areaCode: "200",
  },
  {
    id: "0016",
    fullName: "BANCO DE CREDITO E INVERSIONES",
    rut: "97018000-1",
    name: "BCI",
    areaCode: "200",
  },
  {
    id: "0037",
    fullName: "BANCO SANTANDER-CHILE",
    rut: "97036000-K",
    name: "SAN",
    areaCode: "200",
  },
  {
    id: "0031",
    fullName: "HSBC BANK (CHILE)",
    rut: "97951000-4",
    name: "HSBC",
    areaCode: "200",
  },
  {
    id: "0039",
    fullName: "ITAÚ CORPBANCA",
    rut: "97023000-9",
    name: "ITAÚ",
    areaCode: "200",
  },
  {
    id: "0041",
    fullName: "JPMORGAN CHASE BANK, N.A.",
    rut: "97043000-8",
    name: "JPM",
    areaCode: "200",
  },
  {
    id: "0049",
    fullName: "BANCO SECURITY",
    rut: "97053000-2",
    name: "SECURITY",
    areaCode: "200",
  },
  {
    id: "0051",
    fullName: "BANCO FALABELLA",
    rut: "96509660-4",
    name: "FALABELLA",
    areaCode: "200",
  },
];

export const intitutionCodeToLabel = (code: string) => {
  return institutionsList.find((institution: any) => institution.id === code)
    ?.name;
};

export const intitutionLabelToCode = (label: string) => {
  return institutionsList.find((institution: any) => institution.id === label)
    ?.id;
};

export const completeInstitutions = (
  value: string | undefined,
  fullName?: boolean
) => {
  if (value === undefined) return "";
  const institution = institutionsList.find(
    (institution) => institution.id === value || institution.name === value
  );

  if (fullName) {
    if (!institution || (!institution.id && !institution.fullName)) return "";
    return `${institution?.fullName || ""}`;
  }

  if (!institution || (!institution.id && !institution.name)) return "";
  return `${institution?.id || ""} - ${institution?.name || ""}`;
};
