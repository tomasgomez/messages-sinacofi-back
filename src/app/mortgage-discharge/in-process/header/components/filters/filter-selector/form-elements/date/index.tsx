import * as React from 'react';

import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

export const DatePickerInput = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label={<Box style={{ backgroundColor: "#DFF8FF"}}>Fecha Inicial y Final</Box>}  defaultValue={dayjs('2022-04-17')} />
    </LocalizationProvider>
  );
};