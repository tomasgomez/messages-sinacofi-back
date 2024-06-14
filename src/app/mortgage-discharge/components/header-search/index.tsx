"use client";

import * as React from "react";

import { Typography } from "@mui/material";
import { HeaderContent, HeaderContainer } from "./styles";
import { Filters } from "./filters";
import { Filter } from "@/types/mortgage-discharge";
import { Dispatch, SetStateAction } from "react";

export default function InboxHeaderSearch(props: {
  title: string;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
}) {
  const { title = "", filters = [], setFilters = () => null } = props || {};

  return (
    <HeaderContainer>
      <HeaderContent>
        <Typography variant="h5">{title}</Typography>
      </HeaderContent>
      <Filters filters={filters} setFilters={setFilters} />
    </HeaderContainer>
  );
}
