"use client";

import * as React from "react";

import { FilterButton } from "./styles";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { FilterSelector } from "./filter-selector";
import Box from "@mui/material/Box/Box";

export const Filter = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <FilterButton
        startIcon={<FilterAltOutlinedIcon />}
        onClick={handleOpenFilter}
      >
        Filtros
      </FilterButton>
      {isOpen && <FilterSelector onClose={setIsOpen} />}
    </Box>
  );
};
