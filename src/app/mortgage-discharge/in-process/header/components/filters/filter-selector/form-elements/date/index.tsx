import * as React from 'react';

import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

export const DatePickerInput = (props: {label: string}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label={<Box style={{ backgroundColor: "#DFF8FF"}}>{props.label}</Box>}  defaultValue={dayjs('2022-04-17')} />
    </LocalizationProvider>
  );
};