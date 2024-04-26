import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TextField, styled } from "@mui/material";
import dayjs from "dayjs";


const StyledDatePicker = styled(DatePicker)((props) => ({
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: "#E5E5E5",
    color: "#000000 !important",
  },
  "& .MuiFormLabel-root.Mui-disabled": {
    backgroundColor: "#DFF8FF",
    color: "#565656 !important",
  },
  "& .MuiInputAdornment-root": {
    display: props.disabled ? "none" : "flex",
  },
  "& .MuiFormLabel-root": {
    color: "#565656 !important",
    backgroundColor: "#DFF8FF"
  },
}));


export const DatePickerInput = (props: {
  label: string;
  onChange: Function;
  keyLabel: string;
  value: any;
  defaultDate?: any;
  error?: any
}) => {
  const { label, onChange, keyLabel, value, defaultDate } = props;
  // const handleChange = React.useCallback(
  //   (evt: any) => {
  //     console.log({ evt });
  //     onChange && onChange(evt.target?.value, evt);
  //   },
  //   [onChange]
  // );
  console.log({value, onChange, props})
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        {...props}
        sx={{ width: "100%" }}
        onChange={(newValue: any) => {
          onChange(newValue.format("YYYY/MM/DD"));
        }}
        // label={<Box style={{ backgroundColor: "#DFF8FF" }}>{label}</Box>}
        label={label}
        // renderInput={(params: any) => <TextField {...params} error={false} />}
        slotProps={{
          textField: {
            error: props.error,
          }
        }}
        defaultValue={defaultDate}
        value={value ? dayjs(value) : null}
      />
    </LocalizationProvider>
  );
};
