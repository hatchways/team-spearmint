import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

interface DatePickerProps {
  name: string;
  id: string;
}

export const DatePickerField: React.FC<DatePickerProps> = ({ name, id }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  return (
    <DatePicker
      wrapperClassName={name === 'start' ? 'left' : 'right'}
      fixedHeight
      showTimeSelect
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mmaaa"
      {...field}
      placeholderText="mm/dd/yyyy"
      popperPlacement="top-end"
      id={id}
      name={name}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
