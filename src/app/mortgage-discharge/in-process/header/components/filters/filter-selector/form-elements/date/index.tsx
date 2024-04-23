import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import dayjs from "dayjs";

export const DatePickerInput = (props: {
  label: string;
  handleChange: Function;
  keyLabel: string;
  value: any;
  defaultDate?: any;
}) => {
  const { label, handleChange, keyLabel, value, defaultDate } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(newValue: any) => {
          handleChange(keyLabel, newValue.format("YYYY/MM/DD"));
        }}
        label={<Box style={{ backgroundColor: "#DFF8FF" }}>{label}</Box>}
        defaultValue={defaultDate}
        value={value ? dayjs(value) : null}
      />
    </LocalizationProvider>
  );
};
