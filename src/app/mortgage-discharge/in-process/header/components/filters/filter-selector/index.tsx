import Box from "@mui/material/Box/Box";
import { FilterSectorCard } from "../styles";
import { DatePickerInput } from "./form-elements/date";
import { RutInput } from "./form-elements/rut-input";
import Button from "@mui/material/Button/Button";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import { CloseRounded } from "@mui/icons-material";
import { CardContext } from "@/app/mortgage-discharge/in-process/store/ModalStore";
import { useCallback, useContext, useState } from "react";
import { handleGenericChangeFilter } from "@/utils/mortgage-discharge";
import { FilterDropdowns } from "./form-elements/date/filtersDropdowns";
import { ObjectsAreEquals, combineArrays } from "@/utils/functions";
import {
  optionsDestination,
  optionsRegion,
  auxFiltersConstant,
} from "./constants";

export const FilterSelector = (props: { onClose: Function }) => {
  const { handleChangeAddFilter, filters } = useContext(CardContext);
  const [auxFilters, setAuxFilters] = useState<any[]>(
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

      // clears the filter, but the initial data has the value "all" in the dropdowns
      // so change "all" to "" to clear the state
      // auxFiltersConstant.forEach((elem) => {
      //   if (
      //     !(
      //       (elem.label === "institutionDestination" && elem.value === "all") ||
      //       (elem.label === "region" && elem.value === "all")
      //     )
      //   ) {
      //     handleChangeAddFilter(elem.label, elem.value);
      //   }
      // });
      // handleClose();
    }
  };

  const handleConfirm = () => {
    auxFilters.forEach((elem) => {
      // save the filter if not is a dropdown with the value all
      if (
        (elem.label === "institutionDestination" && elem.value === "all") ||
        (elem.label === "region" && elem.value === "all")
      ) {
        handleChangeAddFilter(elem.label, "");
      } else {
        handleChangeAddFilter(elem.label, elem.value);
      }
    });
    handleClose();
  };

  const getValue = useCallback(
    (labelKey: string) => {
      return auxFilters.find((filter) => filter.label === labelKey)?.value;
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
        onChange={(newValue: any) =>
          handleAuxFilter("startDate", newValue.format("YYYY/MM/DD"))
        }
        keyLabel="startDate"
        label="Fecha Inicial"
        value={getValue("startDate")}
      />
      <DatePickerInput
        onChange={(newValue: any) =>
          handleAuxFilter("endDate", newValue.format("YYYY/MM/DD"))
        }
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
      <RutInput
        handleChange={handleAuxFilter}
        keyLabel="clientDni"
        label="RUT Comprador"
        value={getValue("clientDni")}
      />
      <RutInput
        handleChange={handleAuxFilter}
        keyLabel="sellerDni"
        label="RUT Vendedor"
        value={getValue("sellerDni")}
      />
      <RutInput
        handleChange={handleAuxFilter}
        keyLabel="debtorDni"
        label="RUT Deudor"
        value={getValue("debtorDni")}
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
