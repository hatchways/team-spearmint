import Calendar from 'react-calendar';
import { useState, useEffect } from 'react';
import './myCalendar.css';
import { date } from 'yup/lib/locale';
import { RequestApiData } from '../../interface/RequestApiData';

interface Props {
  nextRequest: RequestApiData;
}

const MyCalendar: React.FC<Props> = ({ nextRequest }) => {
  const [dateValue, setDateValue] = useState<any>(null);
  useEffect(() => {
    if (nextRequest) {
      const theDate = new Date(nextRequest.start);
      setDateValue(theDate);
    }
  }, [nextRequest]);
  return <Calendar value={dateValue}></Calendar>;
};

export default MyCalendar;
