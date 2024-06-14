import {
  CollapseContainer,
  FilterGroup,
  FilterHeader,
  FilterSectorCard,
  RadioButtonContainer,
  StyledContainerButtons,
} from "./styles";
import { DatePickerInput } from "./form-elements/date";
import { RutInput } from "./form-elements/rut-input";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import { handleGenericChangeFilter } from "@/utils/mortgage-discharge-utils";
import { FilterDropdowns } from "./form-elements/date/filtersDropdowns";
import { Filter } from "@/types/mortgage-discharge";
import { useCalcDimensions } from "@/utils/dimensions";
import { montserrat } from "@/utils/fonts";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  Collapse,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const Filters = (props: {
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { filters = [], setFilters = () => null } = props;

  const handleChangeFilter = (label: string, value: any) => {
    handleGenericChangeFilter(label, value, setFilters);
  };

  const handleClear = () => {
    setFilters([]);
  };

  const handleConfirm = () => {
    const returnFilters = filters.filter(
      (elem) =>
        !(
          ["institutionSender", "AHStatus", "notaria", "radioButton"].includes(
            elem.label
          ) && elem.value === "all"
        )
    );
    console.log("filters", returnFilters);
  };

  const getValue = useCallback(
    (labelKey: string, defaultValue?: string) => {
      return (
        filters.find((filter) => filter.label === labelKey)?.value ||
        defaultValue ||
        ""
      );
    },
    [filters]
  );

  const sideBar = 270;
  const marginScreen = 20;

  const { width: screenWidth }: { width: number } = useCalcDimensions(
    0,
    sideBar + marginScreen * 2
  );

  const handlerColapseCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FilterSectorCard>
      <FilterHeader>
        <Typography
          fontWeight={500}
          fontSize={20}
          fontFamily={montserrat.style.fontFamily}
        >
          Filtros de Búsqueda
        </Typography>
        {isOpen ? (
          <IconButton style={{ color: "#565656" }} onClick={handlerColapseCard}>
            <KeyboardArrowUpIcon />
          </IconButton>
        ) : (
          <IconButton style={{ color: "#565656" }} onClick={handlerColapseCard}>
            <KeyboardArrowDownIcon />
          </IconButton>
        )}
      </FilterHeader>
      <Collapse in={isOpen} timeout={1000}>
        <CollapseContainer>
          <RadioButtonContainer>
            <Typography fontWeight={400} fontSize={16} minWidth={75}>
              Buscar en
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="all"
            >
              <FormControlLabel
                value="all"
                control={
                  <Radio
                    onClick={(event: any) =>
                      handleChangeFilter("radioButton", event.target?.value)
                    }
                  />
                }
                label="Todos"
              />
              <FormControlLabel
                value="sent"
                control={
                  <Radio
                    onClick={(event: any) =>
                      handleChangeFilter("radioButton", event.target?.value)
                    }
                  />
                }
                label="Alzamientos Hipotecarios Enviados"
              />
              <FormControlLabel
                value="received"
                style={{ marginRight: 0 }}
                control={
                  <Radio
                    onClick={(event: any) =>
                      handleChangeFilter("radioButton", event.target.value)
                    }
                  />
                }
                label="Alzamientos Hipotecarios Recibidos"
              />
            </RadioGroup>
          </RadioButtonContainer>
          <FilterGroup>
            <FilterDropdowns
              // 100%  / 3 - 12px (gap between the 3 inputs ((2 * 16px) / 3))
              sx={{ width: "calc((100% / 3) - 10px)" }}
              title="Institución Emisora"
              handleChange={handleChangeFilter}
              keyLabel="institutionSender"
              options={[{ label: "Todos", value: "all" }]}
              optionSelected={getValue("institutionSender", "all")}
            />
            <DatePickerInput
              sx={{ width: "calc((100% / 3) - 10px)" }}
              onChange={(newValue: unknown) =>
                handleChangeFilter("startDate", newValue)
              }
              keyLabel="startDate"
              label="Fecha Inicial"
              value={getValue("startDate")}
            />
            <DatePickerInput
              sx={{ width: "calc((100% / 3) - 10px)" }}
              onChange={(newValue: unknown) =>
                handleChangeFilter("endDate", newValue)
              }
              keyLabel="endDate"
              label="Fecha Final"
              value={getValue("endDate")}
            />
          </FilterGroup>
          <FilterGroup>
            <RutInput
              // screen - 40px (paddingRight + paddingLeft) / 4 - 12px (gap between the 4 inputs ((3 * 16px) / 4))
              sx={{
                width: screenWidth
                  ? `calc((${screenWidth}px - 40px) / 4 - 12px)`
                  : 256,
              }}
              handleChange={handleChangeFilter}
              keyLabel="buyerDni"
              label="RUT Comprador"
              value={getValue("buyerDni")}
            />
            <RutInput
              sx={{
                width: screenWidth
                  ? `calc((${screenWidth}px - 40px) / 4 - 12px)`
                  : 256,
              }}
              handleChange={handleChangeFilter}
              keyLabel="sellerDni"
              label="RUT Vendedor"
              value={getValue("sellerDni")}
            />
            <RutInput
              sx={{
                width: screenWidth
                  ? `calc((${screenWidth}px - 40px) / 4 - 12px)`
                  : 256,
              }}
              handleChange={handleChangeFilter}
              keyLabel="debtorDni"
              label="RUT Deudor"
              value={getValue("debtorDni")}
            />
            <RutInput
              sx={{
                width: screenWidth
                  ? `calc((${screenWidth}px - 40px) / 4 - 12px)`
                  : 256,
              }}
              handleChange={handleChangeFilter}
              keyLabel="internalCode"
              label="Codigo Interno"
              value={getValue("internalCode")}
            />
          </FilterGroup>
          <FilterGroup>
            <FilterDropdowns
              sx={{ width: "calc((100% / 3) - 10px)" }}
              title="Notaria"
              handleChange={handleChangeFilter}
              keyLabel="notaria"
              options={[{ label: "Todos", value: "all" }]}
              optionSelected={getValue("notaria", "all")}
            />
            <DatePickerInput
              sx={{ width: "calc((100% / 3) - 10px)" }}
              onChange={(newValue: unknown) =>
                handleChangeFilter("repertoiredate", newValue)
              }
              keyLabel="repertoiredate"
              label="Fecha de Repertorio"
              value={getValue("repertoiredate")}
            />
            <FilterDropdowns
              sx={{ width: "calc((100% / 3) - 10px)" }}
              title="Estado AH"
              handleChange={handleChangeFilter}
              keyLabel="AHStatus"
              options={[{ label: "Todos", value: "all" }]}
              optionSelected={getValue("AHStatus", "all")}
            />
          </FilterGroup>
        </CollapseContainer>
        <StyledContainerButtons>
          <Button
            variant="outlined"
            sx={{
              color: "#00B2E2",
              width: "125px",
            }}
            onClick={handleClear}
          >
            Borrar Filtros
          </Button>
          <Button
            variant="contained"
            sx={{ color: "#FFF", width: "125px" }}
            onClick={handleConfirm}
          >
            Buscar
          </Button>
        </StyledContainerButtons>
      </Collapse>
    </FilterSectorCard>
  );
};
