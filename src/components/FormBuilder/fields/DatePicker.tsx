import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as DataPickerMui } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material";
import dayjs from "dayjs";

const StyledDatePicker = styled(DataPickerMui)((props) => ({
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: "#E5E5E5",
    color: "#000000 !important",
  },
  "& .MuiFormLabel-root.Mui-disabled": {
    backgroundColor: "#DFF8FF",
    color: "#565656 !important",
  },
  "& .MuiAdornment-root": {
    display: props.disabled ? "none" : "flex",
  },
  "& .MuiFormLabel-root": {
    color: "#565656 !important",
    backgroundColor: "#DFF8FF",
  },
}));

export const DatePicker = (props: {
  label: string;
  onChange: Function;
  value: any;
  defaultDate?: any;
  error?: any;
  sx?: any;
}) => {
  const { label, onChange, value = "", defaultDate, sx = {}, ...rest } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        sx={{ width: "100%", ...sx, }}
        onChange={(newValue: any) => {
          onChange(newValue.format("YYYY/MM/DD"));
        }}
        label={label}
        slotProps={{
          textField: {
            error: props.error,
          },
        }}
        defaultValue={defaultDate}
        value={dayjs(value)}
        {...rest}
      />
    </LocalizationProvider>
  );
};
