import { getInstitutions } from "@/app/services/common";
import { useEffect, useState } from "react";
import Dropdrown from "../Dropdown";

const AllOption = {
  value: "all",
  label: "Todas",
};

const InstitutionDropdown = ({
  label = "Intituciones",
  defaultValue,
  width,
  placeholder,
  onChange = () => {},
  withAllOption = false,
  selected,
}: {
  label: string;
  defaultValue?: any;
  width?: number | string;
  placeholder: string;
  onChange?: Function;
  selected?: string;
  withAllOption?: boolean;
}) => {
  const [institutionList, setInstitutionList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getInstitutions().then((institutions: any) => {
      const formattedInstitutions = (institutions || [])?.map(
        (institution: any) => ({
          value: institution.id,
          label: `${institution.id} - ${institution.name}`,
        })
      );
      setInstitutionList(
        withAllOption
          ? [AllOption, ...formattedInstitutions]
          : formattedInstitutions
      );
      setLoading(false);
    });
  }, [withAllOption]);

  return (
    <Dropdrown
      key={`dropdown-institution`}
      label={label}
      options={institutionList}
      width={width}
      loading={loading}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      selected={selected}
    />
  );
};

export default InstitutionDropdown;
