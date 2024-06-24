import Box from "@mui/material/Box/Box";
import { FilterSectorCard } from "../styles";
import { DatePickerInput } from "@/app/mortgage-discharge/components/headers/form-elements/date";
import { TextInputFilters } from "@/app/mortgage-discharge/components/headers/form-elements/text-input-filters";
import Button from "@mui/material/Button/Button";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import { CloseRounded } from "@mui/icons-material";
import { useCallback, useState } from "react";
import { handleGenericChangeFilter } from "@/utils/mortgage-discharge-utils";
import { FilterDropdowns } from "@/app/mortgage-discharge/components/headers/form-elements/filters-dropdowns";
import { ObjectsAreEquals, combineArrays } from "@/utils/functions";
import { optionsRegion, optionsNotoria, auxFiltersConstant } from "../../constants";
import { Filter } from "@/types/mortgage-discharge";

export const FilterSelector = (props: {
  onClose: Function;
  handleChangeAddFilter: Function;
  filters: Filter[];
}) => {
  const {
    onClose = () => null,
    handleChangeAddFilter = () => null,
    filters = [],
  } = props || {};

  const [auxFilters, setAuxFilters] = useState<Filter[]>(
    // combines arrays, have priority in filter elements when the label is the same
    combineArrays(auxFiltersConstant, filters)
  );

  const handleClose = () => {
    onClose(false);
  };

  const handleAuxFilter = (label: string, value: any) => {
    handleGenericChangeFilter(label, value, setAuxFilters);
  };

  const handleClear = () => {
    if (!ObjectsAreEquals(auxFiltersConstant)) {
      setAuxFilters(auxFiltersConstant);
    }
  };

  const handleConfirm = () => {
    auxFilters.forEach((elem) => {
      // save the filter if not is a dropdown with the value all
      if (
        (elem.label === "notary" && elem.value === "all") ||
        (elem.label === "region" && elem.value === "all")
      )
        handleChangeAddFilter(elem.label, "");
      else handleChangeAddFilter(elem.label, elem.value);
    });
    handleClose();
  };

  const getValue = useCallback(
    (labelKey: string) => {
      return (
        auxFilters.find((filter) => filter.label === labelKey)?.value || ""
      );
    },
    [auxFilters]
  );

  return (
    <FilterSectorCard>
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", right: "10px", top: "10px" }}
      >
        <CloseRounded />
      </IconButton>
      <Typography variant="h6" fontWeight={500} mb={1} fontSize={16}>
        Filtros
      </Typography>
      <DatePickerInput
        onChange={handleAuxFilter}
        keyLabel="startDate"
        label="Fecha Inicial"
        value={getValue("startDate")}
      />
      <DatePickerInput
        onChange={handleAuxFilter}
        keyLabel="endDate"
        label="Fecha Final"
        value={getValue("endDate")}
      />
      <TextInputFilters
        placeholder="Ingrese RUT..."
        handleChange={handleAuxFilter}
        keyLabel="buyerDni"
        label="RUT Comprador"
        value={getValue("buyerDni")}
      />
      <TextInputFilters
        placeholder="Ingrese RUT..."
        handleChange={handleAuxFilter}
        keyLabel="debtorDni"
        label="RUT Deudor"
        value={getValue("debtorDni")}
      />
      <FilterDropdowns
        title="Notoria"
        handleChange={handleAuxFilter}
        keyLabel="notary"
        options={optionsNotoria}
        optionSelected={getValue("notary")}
      />
      <FilterDropdowns
        title="Region"
        handleChange={handleAuxFilter}
        keyLabel="region"
        options={optionsRegion}
        optionSelected={getValue("region")}
      />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button
          variant="outlined"
          sx={{ color: "#00B2E2", width: "125px", borderColor: "transparent" }}
          onClick={handleClear}
        >
          Borrar Filtros
        </Button>
        <Button
          variant="contained"
          sx={{ color: "#FFF", width: "125px" }}
          onClick={handleConfirm}
        >
          Aplicar
        </Button>
      </Box>
    </FilterSectorCard>
  );
};
