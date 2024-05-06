import { getInstitutions } from "@/app/services/common";

export const intitutionCodeToLabel = async (code: string) => {
  return ((await getInstitutions()) as any[]).find(
    (institution) => institution.id === code
  ).name;
};

export const intitutionLabelToCode = async (label: string) => {
  return ((await getInstitutions()) as any[]).find(
    (institution) => institution.id === label
  ).id;
};
