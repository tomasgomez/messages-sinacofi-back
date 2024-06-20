"use client";

import * as React from "react";

import { Typography } from "@mui/material";
import { HeaderContent, HeaderContainer } from "./styles";
import { Filters } from "./filters";

export default function InboxHeaderSearch(props: {
  title: string;
  handleGetData: Function;
}) {
  const { title = "", handleGetData = () => null } = props || {};

  return (
    <HeaderContainer>
      <HeaderContent>
        <Typography variant="h5">{title}</Typography>
      </HeaderContent>
      <Filters handleGetData={handleGetData} />
    </HeaderContainer>
  );
}
