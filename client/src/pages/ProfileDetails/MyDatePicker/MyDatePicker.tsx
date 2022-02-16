import React from 'react';
import { Box, InputLabel, CircularProgress, Button, Grid } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './myDatePicker.css';
import format from 'date-fns/format';

interface MyDatePickerProps {
  name: string;
  id: string;
  label: string;
}

export const MyDatePicker: React.FC<MyDatePickerProps> = ({ name, id, label }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const date = format(Date.now(), 'd MMMM yyyy');
  const time = format(Date.now(), 'h aaa');

  return (
    <Box>
      <InputLabel
        sx={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#000',
        }}
        shrink
        htmlFor={id}
      >
        {label}
      </InputLabel>
      <Grid container>
        <Grid item xs={8}>
          <DatePicker
            wrapperClassName="left"
            placeholderText={date}
            fixedHeight
            dateFormat="d MMMM yyyy"
            popperPlacement="top-end"
            {...field}
            id={id}
            name={name}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(val) => {
              setFieldValue(field.name, val);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <DatePicker
            wrapperClassName="right"
            placeholderText={time}
            fixedHeight
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            popperPlacement="top"
            {...field}
            id={id}
            name={name}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(val) => {
              setFieldValue(field.name, val);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
