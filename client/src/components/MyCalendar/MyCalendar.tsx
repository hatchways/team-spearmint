import Calendar from 'react-calendar';
import { useState } from 'react';
import './myCalendar.css';

const MyCalendar: React.FC = () => {
  const [dateValue, setDateValue] = useState(new Date());
  return <Calendar value={dateValue}></Calendar>;
};

export default MyCalendar;
