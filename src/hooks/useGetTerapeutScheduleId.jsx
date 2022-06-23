import { useState, useEffect } from 'react';
import {
  dateToTimestampZeroHours,
  dateToDayAndMonth,
  timestampToDate,
} from '../utils.js';
import useGetTimeslotsForDateAndTerapeut from './useGetTimeslotsForDateAndTerapeut.jsx';

const useGetTerapeutScheduleId = (
  startDate,
  terapeutCalendar,
  terapeutProgramari,
) => {
  const [terapuetScheduleId, setTerapeutScheduleId] = useState({});
  // console.log(terapuetScheduleId);
  // console.log(startDate);
  // console.log(terapeutCalendar.length);
  const { calendarTimeslotsForDate, programariTimeslotsForDate } =
    useGetTimeslotsForDateAndTerapeut(
      startDate,
      terapeutCalendar,
      terapeutProgramari,
    );

  useEffect(() => {
    if (startDate) {
      for (let i = 0; i < terapeutCalendar.length; i++) {
        if (
          timestampToDate(startDate) ===
          timestampToDate(terapeutCalendar[i].timeSlotStart)
        ) {
          // console.log(dateToTimestampZeroHours(startDate));
          // console.log(terapeutCalendar[i].timeSlotStart);
          // console.log(terapeutCalendar[i].timeSlotEnd);
          // console.log(true, startDate);
        }
        // console.log(timestampToDate(startDate));
        // console.log(timestampToDate(terapeutCalendar[i].timeSlotStart));
        // console.log(terapeutCalendar[i].timeSlotEnd);
      }
    }
  }, [startDate]);

  return { terapuetScheduleId };
};

export default useGetTerapeutScheduleId;
