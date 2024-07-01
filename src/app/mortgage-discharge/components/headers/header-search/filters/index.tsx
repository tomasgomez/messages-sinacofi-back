import {
  CollapseContainer,
  FilterGroup,
  FilterHeader,
  FilterSectorCard,
  RadioButtonContainer,
  StyledContainerButtons,
} from "./styles";
import { DatePickerInput } from "../../form-elements/date";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import { handleGenericChangeFilter } from "@/utils/mortgage-discharge-utils";
import { FilterDropdowns } from "../../form-elements/filters-dropdowns";
import { Filter } from "@/types/mortgage-discharge";
import { montserrat } from "@/utils/fonts";
import { useCallback, useState } from "react";
import {
  Collapse,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  optionsNotaria,
  optionsAHStatus,
  optionsInstitutions,
} from "./constants";
import RutField from "../../form-elements/text-rut-field/RutField";
import { TextInputFilters } from "../../form-elements/text-input-filters";

export const Filters = (props: { handleGetData: Function }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState<Filter[]>([]);

  const { handleGetData = () => null } = props;

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
    handleGetData(returnFilters);
  };

  const getValue = useCallback(
    (labelKey: string, defaultValue?: string) => {
      return (
        (filters.find((filter) => filter.label === labelKey)
          ?.value as string) ||
        defaultValue ||
        ""
      );
    },
    [filters]
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
                      handleChangeFilter("status", event.target?.value)
                    }
                  />
                }
                label="Todos"
              />
              <FormControlLabel
                value="05"
                control={
                  <Radio
                    onClick={(event: any) =>
                      handleChangeFilter("status", event.target?.value)
                    }
                  />
                }
                label="Alzamientos Hipotecarios Enviados"
              />
              <FormControlLabel
                value="06"
                style={{ marginRight: 0 }}
                control={
                  <Radio
                    onClick={(event: any) =>
                      handleChangeFilter("status", event.target.value)
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
              keyLabel="institutionCode"
              options={optionsInstitutions}
              optionSelected={getValue("institutionCode", "all")}
            />
            <DatePickerInput
              sx={{ width: "calc((100% / 3) - 10px)" }}
              onChange={handleChangeFilter}
              keyLabel="startDate"
              label="Fecha Inicial"
              value={getValue("startDate")}
            />
            <DatePickerInput
              sx={{ width: "calc((100% / 3) - 10px)" }}
              onChange={handleChangeFilter}
              keyLabel="endDate"
              label="Fecha Final"
              value={getValue("endDate")}
            />
          </FilterGroup>
          <FilterGroup>
            <RutField
              placeholder="Ingrese RUT..."
              // 100% / 4 - 12px (gap between the 4 inputs ((3 * 16px) / 4))
              width={`calc( 100%  / 4 - 12px)`}
              handleChange={handleChangeFilter}
              keyLabel="buyerDni"
              label="RUT Comprador"
              value={getValue("buyerDni")}
            />
            <RutField
              placeholder="Ingrese RUT..."
              width={`calc( 100%  / 4 - 12px)`}
              handleChange={handleChangeFilter}
              keyLabel="sellerDni"
              label="RUT Vendedor"
              value={getValue("sellerDni")}
            />
            <RutField
              placeholder="Ingrese RUT..."
              width={`calc( 100%  / 4 - 12px)`}
              handleChange={handleChangeFilter}
              keyLabel="borrowerDni"
              label="RUT Deudor"
              value={getValue("borrowerDni")}
            />
            <TextInputFilters
              placeholder="Ingrese el Codigo Interno..."
              width={`calc( 100%  / 4 - 12px)`}
              handleChange={handleChangeFilter}
              keyLabel="cukCode"
              label="Codigo Interno"
              value={getValue("cukCode")}
            />
          </FilterGroup>
          <FilterGroup>
            <FilterDropdowns
              sx={{ width: "calc((100% / 3) - 10px)" }}
              title="Notaria"
              handleChange={handleChangeFilter}
              keyLabel="notary"
              options={optionsNotaria}
              optionSelected={getValue("notary", "all")}
            />
            <DatePickerInput
              sx={{ width: "calc((100% / 3) - 10px)" }}
              onChange={handleChangeFilter}
              keyLabel="repertoireDate"
              label="Fecha de Repertorio"
              value={getValue("repertoireDate")}
            />
            <FilterDropdowns
              sx={{ width: "calc((100% / 3) - 10px)" }}
              title="Estado AH"
              handleChange={handleChangeFilter}
              keyLabel="AHStatus"
              options={optionsAHStatus}
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
