"use client";

import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Field from "@/components/Field";
import { CardContext } from "../../../store/ModalStore";

export const InputCode = (props: { title: string; options: string[] }) => {
  const [code, setCode] = React.useState("");
  const { handleChangeAddFilter } = React.useContext(CardContext);

  return (
    <Autocomplete
      freeSolo
      value={code}
      onChange={(event: any, newValue: string | null) => {
        setCode(newValue || "");
        handleChangeAddFilter("CUK", newValue || "");
      }}
      clearOnBlur={false}
      clearOnEscape={false}
      options={props.options || []}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.title}
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

// I dont now if is with autocomplete the field or not, so i will conservate the old option
// export const InputCode = (props: { title: string }) => {
//   const [code, setCode] = React.useState("");
//   const { handleChangeAddFilter } = React.useContext(CardContext);

//   return (
//     <Field
//       InputProps={{ sx: { height: "48px" } }}
//       value={code}
//       label={props.title}
//       placeholder="Ingrese Código..."
//       onChange={(value: any) => {
//         setCode(value);
//         handleChangeAddFilter("CUK", value);
//       }}
//       InputLabelProps={{ shrink: true, style: { background: "#DFF8FF" } }}
//       {...props}
//     />
//   );
// };
