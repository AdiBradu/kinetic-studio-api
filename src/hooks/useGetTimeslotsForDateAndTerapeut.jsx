import { useState, useEffect } from "react";
import { timestampToDayAndMonth, dateToDayAndMonth } from "../utils.js";

const useGetTimeslotsForDateAndTerapeut = (
  startDate,
  terapeutCalendar,
  terapeutProgramari
) => {
  
  const [calendarTimeslotsForDate, setCalendarTimeslotsForDate] = useState({});
  
  useEffect(() => {
    if (startDate) {
      setCalendarTimeslotsForDate({});
      for (let i = 0; i < terapeutCalendar.length; i++) {
        if (
          timestampToDayAndMonth(terapeutCalendar[i].timeSlotStart)[0] ===
          dateToDayAndMonth(startDate)[0]
        ) {
          setCalendarTimeslotsForDate({
            start: terapeutCalendar[i].timeSlotStart,
            end: terapeutCalendar[i].timeSlotEnd,
          });
        }
      }
    }
  }, [startDate, terapeutCalendar]);

  const [programariTimeslotsForDate, setProgramariTimeslotsForDate] = useState(
    {}
  );

  useEffect(() => {
    if (startDate) {
      setProgramariTimeslotsForDate({});
      for (let i = 0; i < terapeutProgramari.length; i++) {
        if (
          timestampToDayAndMonth(terapeutProgramari[i].timeSlotStart)[0] ===
          dateToDayAndMonth(startDate)[0]
        ) {
          setProgramariTimeslotsForDate({
            start: terapeutProgramari[i].timeSlotStart,
            end: terapeutProgramari[i].timeSlotEnd,
          });
        }
      }
    }
  }, [startDate, terapeutProgramari]);

  return { calendarTimeslotsForDate, programariTimeslotsForDate };
};

export default useGetTimeslotsForDateAndTerapeut;
