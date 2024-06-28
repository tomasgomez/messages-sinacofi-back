import Box from "@mui/material/Box/Box";
import { FilterSectorCard } from "../styles";
import { DatePickerInput } from "@/app/mortgage-discharge/components/headers/form-elements/date";
import Button from "@mui/material/Button/Button";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import { CloseRounded } from "@mui/icons-material";
import { MortgageDischargeContext } from "@/app/mortgage-discharge/components/store/ModalStore";
import { useCallback, useContext, useState } from "react";
import { handleGenericChangeFilter } from "@/utils/mortgage-discharge-utils";
import { FilterDropdowns } from "@/app/mortgage-discharge/components/headers/form-elements/filters-dropdowns";
import { ObjectsAreEquals, combineArrays } from "@/utils/functions";
import {
  optionsDestination,
  optionsRegion,
  optionsNotoria,
  auxFiltersConstant,
} from "./constants";
import { Filter } from "@/types/mortgage-discharge";
import RutField from "../../../form-elements/text-rut-field/RutField";

export const FilterSelector = (props: { onClose: Function }) => {
  const { handleChangeAddFilter, filters } = useContext(
    MortgageDischargeContext
  );
  const [auxFilters, setAuxFilters] = useState<Filter[]>(
    // combines arrays, have priority in filter elements when the label is the same
    combineArrays(auxFiltersConstant, filters)
  );

  const handleClose = () => {
    props.onClose(false);
  };

  const handleAuxFilter = (label: string, value: any) => {
    handleGenericChangeFilter(label, value, setAuxFilters);
  };

  const handleClear = () => {
    if (
      !ObjectsAreEquals(
        auxFilters.filter((elem) => elem.label !== "channel"),
        auxFiltersConstant
      )
    ) {
      setAuxFilters(auxFiltersConstant);
    }
  };

  const handleConfirm = () => {
    auxFilters.forEach((elem) => {
      // save the filter if not is a dropdown with the value all
      if (
        (elem.label === "institutionDestination" && elem.value === "all") ||
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
      <Typography variant="h6" fontWeight={500} mb={2} fontSize={16}>
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
      <FilterDropdowns
        title="Institución Destino"
        handleChange={handleAuxFilter}
        keyLabel="institutionDestination"
        options={optionsDestination}
        optionSelected={getValue("institutionDestination")}
      />
      <RutField
        placeholder="Ingrese RUT..."
        handleChange={handleAuxFilter}
        keyLabel="buyerDni"
        label="RUT Comprador"
        value={getValue("buyerDni")}
      />
      <RutField
        placeholder="Ingrese RUT..."
        handleChange={handleAuxFilter}
        keyLabel="sellerDni"
        label="RUT Vendedor"
        value={getValue("sellerDni")}
      />
      <RutField
        placeholder="Ingrese RUT..."
        handleChange={handleAuxFilter}
        keyLabel="borrowerDni"
        label="RUT Deudor"
        value={getValue("borrowerDni")}
      />
      <FilterDropdowns
        title="Notoria"
        handleChange={handleAuxFilter}
        keyLabel="notary"
        options={optionsNotoria}
        optionSelected={getValue("notary")}
      />
      <DatePickerInput
        onChange={handleAuxFilter}
        keyLabel="repertoireDate"
        label="Fecha de Repertorio"
        value={getValue("repertoireDate")}
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
