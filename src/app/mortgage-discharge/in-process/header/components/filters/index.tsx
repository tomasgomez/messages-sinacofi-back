"use client";

import * as React from "react";

import { FilterButton } from "./styles";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

export const Filter = () => {

  return (
    <FilterButton startIcon={<FilterAltOutlinedIcon />}>
        Filtros
    </FilterButton>
  );
};