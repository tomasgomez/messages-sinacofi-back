"use client";

import * as React from "react";
import { Typography } from "@mui/material";
import { HeaderContent, HeaderContainer, ContainerFilters } from "./styles";
import { Filter } from "@/types/mortgage-discharge";
import { Dispatch, SetStateAction } from "react";
import { DatePickerInput } from "../form-elements/date";
import { FilterDropdowns } from "../form-elements/filters-dropdowns";
import { TextInputFilters } from "../form-elements/text-input-filters";
import { Filters } from "@/app/mortgage-discharge/components/headers/header-informs/filters-modal";
import { handleGenericChangeFilter } from "@/utils/mortgage-discharge-utils";
import { optionsChannels, optionsIntitutions } from "./constants";

export default function HeaderInforms(props: {
  title: string;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
}) {
  const { title = "", filters = [], setFilters = () => null } = props || {};

  const handleChange = (label: string, value: string) => {
    if (
      (label === "channel" && value === "all") ||
      (label === "institution" && value === "all")
    )
      handleGenericChangeFilter(label, "", setFilters);
    else handleGenericChangeFilter(label, value, setFilters);
  };

  const getValue = React.useCallback(
    (labelKey: string, defaultValue?: string) => {
      return (
        filters.find((filter) => filter.label === labelKey)?.value ||
        defaultValue ||
        ""
      );
    },
    [filters]
  );

  return (
    <HeaderContainer>
      <HeaderContent>
        <Typography variant="h5">{title}</Typography>
      </HeaderContent>
      <ContainerFilters>
        <FilterDropdowns
          sx={{ width: `calc(((100% - 50px) / 4) - 16px)` }}
          title="Canal"
          handleChange={handleChange}
          keyLabel="channel"
          options={optionsChannels}
          optionSelected={getValue("channel", "all")}
        />
        <FilterDropdowns
          sx={{ width: `calc(((100% - 50px) / 4) - 16px)` }}
          title="Institución"
          handleChange={handleChange}
          keyLabel="institution"
          options={optionsIntitutions}
          optionSelected={getValue("institution", "all")}
        />
        <DatePickerInput
          sx={{ width: `calc(((100% - 50px) / 4) - 16px)` }}
          onChange={handleChange}
          keyLabel="RepertoireDate"
          label="Fecha de Repertorio"
          value={getValue("RepertoireDate")}
        />
        <TextInputFilters
          width={`calc(((100% - 50px) / 4) - 16px)`}
          placeholder="Ingrese RUT..."
          handleChange={handleChange}
          keyLabel="sellerDni"
          label="Rut del Vendedor"
          value={getValue("sellerDni")}
        />
        <Filters filters={filters} handleChange={handleChange} />
      </ContainerFilters>
    </HeaderContainer>
  );
}
