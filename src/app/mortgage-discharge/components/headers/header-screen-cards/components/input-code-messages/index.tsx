"use client";

import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { MortgageDischargeContext } from "@/app/mortgage-discharge/components/store/ModalStore";

export const InputCode = (props: { title: string; options: string[] }) => {
  const { title = "", options = [] } = props || {};
  const [code, setCode] = React.useState("");
  const { handleChangeAddFilter } = React.useContext(MortgageDischargeContext);

  return (
    <Autocomplete
      freeSolo
      value={code}
      onChange={(event: any, newValue: string | null) => {
        setCode(newValue || "");
        handleChangeAddFilter("cukCode", newValue || "");
      }}
      clearOnBlur={false}
      clearOnEscape={false}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={title}
          placeholder="Ingrese Código..."
          InputLabelProps={{ shrink: true, style: { background: "#DFF8FF" } }}
          InputProps={{
            ...params.InputProps,
            sx: { height: "48px", width: "220px" },
          }}
        />
      )}
    />
  );
};
