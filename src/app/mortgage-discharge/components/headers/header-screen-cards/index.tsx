"use client";

import * as React from "react";

import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import {
  HeaderContent,
  FilterContainer,
  HeaderContainer,
  toggleButtonSx,
} from "./styles";
import { MessageTypeDropdown } from "./components/dropdown-type-messages";
import { InputCode } from "./components/input-code-messages";
import { Filter } from "./filters-modal";
import { CardContext } from "../../store/ModalStore";
import { MessageStatusDropdown } from "./components/dropdown-status-messages";

export default function InboxHeader(props: {
  title: string;
  dataCodeList: string[];
}) {
  const { title = "", dataCodeList = [] } = props || {};

  const [alignment, setAlignment] = React.useState("Personas");
  const { handleChangeAddFilter } = React.useContext(CardContext);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      handleChangeAddFilter("channel", newAlignment);
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Typography variant="h5">{title}</Typography>
        <ToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
          <ToggleButton sx={toggleButtonSx} value="">
            Todos
          </ToggleButton>
          <ToggleButton sx={toggleButtonSx} value="Personas">
            Personas
          </ToggleButton>
          <ToggleButton sx={toggleButtonSx} value="Inmobiliarias">
            Inmobiliarias
          </ToggleButton>
        </ToggleButtonGroup>
      </HeaderContent>
      <FilterContainer>
        <InputCode options={dataCodeList} title="Código de operación" />
        <MessageTypeDropdown widthDropdown={300} />
        <MessageStatusDropdown widthDropdown={300} />
        <Box ml="auto">
          <Filter />
        </Box>
      </FilterContainer>
    </HeaderContainer>
  );
}
