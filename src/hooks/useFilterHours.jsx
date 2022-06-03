import { useState, useEffect } from "react";

const useFilterHours = (
  calendarTimeslotsForDate,
  programariTimeslotsForDate,
  startDate,
  durataSedinta
) => {
  const [filteredHours, setFilteredHours] = useState();
  const options = [];

  for (let i = 0; i < 48; i++) {
    options.push(i * 30);
  }
  console.log(durataSedinta)
  useEffect(() => {
    const hoursAndMinutes = [];
    const startIntervalCalendar =
      (calendarTimeslotsForDate.start - startDate) / 60000;
    const endIntervalCalendar =
      (calendarTimeslotsForDate.end - startDate) / 60000 - durataSedinta / 60000;
    const startIntervalProgramari =
      (programariTimeslotsForDate.start - startDate) / 60000;
    const endIntervalProgramari =
      (programariTimeslotsForDate.end - startDate) / 60000;    
    if (durataSedinta) {
      options.forEach((option) => {
        if (
          (option >= startIntervalCalendar) &
          (option <= endIntervalCalendar - (durataSedinta / 60000 - 60))
        ) {
          if (startIntervalProgramari) {
            if (
              option <= startIntervalProgramari - durataSedinta / 60000 ||
              option >= endIntervalProgramari + 60
            ) {
              hoursAndMinutes.push(option);
            }
          } else {
            hoursAndMinutes.push(option);
          }
        }
      });
    } else {
      options.forEach((option) => {
        hoursAndMinutes.push(option);
      });
    }

    setFilteredHours(hoursAndMinutes);
  }, [
    calendarTimeslotsForDate,
    programariTimeslotsForDate,
    startDate,
    durataSedinta,
  ]);

  return { filteredHours };
};

export default useFilterHours;
