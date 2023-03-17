import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from '@mui/material';
import enLocale from 'date-fns/locale/en-US';
import React from 'react';

type DatePickerFieldProps = DatePickerProps & {
  label: string;
  value: Date | number;
  minDate: Date | number;
  name: string;
  error?: string;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, name, value, minDate, onChange, error, ...rest }) => {
  const convertToDefEventParam = (name: string, value: Date | number | null) => ({
    target: {
      name,
      value: new Date(Number(value)).getTime(),
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
      <DatePicker
        mask='__.__.____'
        label={label}
        value={value}
        minDate={minDate || Date.now()}
        //TODO: inputProps not found DatePickerTypes.... ??
        //@ts-ignore
        inputProps={{ placeholder: 'dd.mm.yyyy' }}
        onChange={date => {
          onChange(convertToDefEventParam(name, date));
        }}
        renderInput={params => <TextField {...params} {...(error && { error: true, helperText: error })} />}
      />
    </LocalizationProvider>
  );
};

export default React.memo(DatePickerField);
