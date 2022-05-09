import React, { useContext, useState } from "react";
import "./Item.component.scss";
import { AppContext } from "../../../AppContext";
import Sedinte from "../Sedinte/Sedinte.component";
import DataCell from "../DataCell/DataCell.component";
import { useLocation } from "react-router";
import DatePicker from "react-datepicker";
import {
  checkIfProgramari,
  checkIfCalendar,
  minutesToTimestamp,
  timestampToHoursAndMinutes,
} from "../../../utils.js";
import useGetTerapeutCalendarAndProgramari from "../../../hooks/useGetTerapeutCalendarAndProgramari";
import useGetTimeslotsForDateAndTerapeut from "../../../hooks/useGetTimeslotsForDateAndTerapeut";
import useFilterHours from "../../../hooks/useFilterHours";
import SelectTimeSlot from "../../Defaults/Select/SelectTimeSlot/SelectTimeSlot.component.jsx";
import ButtonCustom from "../../Defaults/Buttons/CustomButton/ButtonCustom.component.jsx";
import { Link } from "react-router-dom";

export default function Item({ item }) {
  console.log(item)
  const { isTablet } = useContext(AppContext);
  const location = useLocation();
  const navlink = location.state;

  //Datepicker
  const [startDate, setStartDate] = useState();

  const [timeSlotStart, setTimeSlotStart] = useState();
  const [timeSlotEnd, setTimeSlotEnd] = useState();

  const handleChangeTimeSlotStart = (e) => {
    const value = minutesToTimestamp(e.target.value, startDate);
    setTimeSlotStart(value);
  };
  const handleChangeTimeSlotEnd = (e) => {
    const value = minutesToTimestamp(e.target.value, startDate);
    setTimeSlotEnd(value);
  };
  const handleAdaugaProgram = () => {
    console.log(
      `Seteaza program terapeut cu datele: terapeut: ${item.id}, timeSlotStar: ${timeSlotStart}, timeSlotEnd: ${timeSlotEnd}`
    );
  };

  const { terapeutCalendar, terapeutProgramari } =
    useGetTerapeutCalendarAndProgramari({ terapeut: item.id });
  const { calendarTimeslotsForDate, programariTimeslotsForDate } =
    useGetTimeslotsForDateAndTerapeut(
      startDate,
      terapeutCalendar,
      terapeutProgramari
    );
  const { filteredHours } = useFilterHours(
    calendarTimeslotsForDate,
    programariTimeslotsForDate,
    startDate
  );

  return (
    <div className="item">
      {isTablet ? (
        <>
          <div className="table">
            <div className="table-header">
              {Object.keys(item).map((key, index) => (
                <DataCell key={index}>{key}</DataCell>
              ))}
            </div>
            <div className="table-row">
              {Object.values(item).map((value, index) => (
                <DataCell key={index}>{value}</DataCell>
              ))}
            </div>
          </div>
          {navlink === "comenzi" && <Sedinte navlink={navlink} item={item} />}
        </>
      ) : (
        <>
          <div className="card">
            {Object.keys(item).map((key, index) => (
  
              <div className="card-row">
                <DataCell>{key}</DataCell>
                <DataCell>{Object.values(item)[index]}</DataCell>
              </div>
            ))}
          </div>
          {navlink === "comenzi" && <Sedinte navlink={navlink} item={item} />}
        </>
      )}
      {navlink === "terapeuti" && (
        <div className="calendar">
          <h3>Program terapeut</h3>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            dayClassName={(date) =>
              checkIfProgramari(terapeutProgramari, date)
                ? "active-programare"
                : checkIfCalendar(terapeutCalendar, date)
                ? "active-calendar"
                : "open-calendar"
            }
            minDate={new Date()}
            inline
          />
          {!programariTimeslotsForDate.start ? (
            <>
              {calendarTimeslotsForDate.start && (
                <p className="info-message">{`Exista un program stabilit pentru acesta zi. ${timestampToHoursAndMinutes(
                  calendarTimeslotsForDate.start
                )} - ${timestampToHoursAndMinutes(
                  calendarTimeslotsForDate.end
                )}`}</p>
              )}
              <p className="start-end-time">Start time</p>
              <SelectTimeSlot
                handleChange={handleChangeTimeSlotStart}
                label={"timeSlotStart"}
                placeholder="alege ora"
                options={filteredHours}
              />
              <p className="start-end-time">End time</p>
              <SelectTimeSlot
                handleChange={handleChangeTimeSlotEnd}
                label={"timeSlotEnd"}
                placeholder="alege ora"
                options={filteredHours}
              />
            </>
          ) : (
            <p className="warning-message">{`Exista programari in acesta zi si nu poti modifica programul! ${timestampToHoursAndMinutes(
              programariTimeslotsForDate.start
            )} - ${timestampToHoursAndMinutes(
              programariTimeslotsForDate.end
            )}`}</p>
          )}
          {timeSlotStart & timeSlotEnd ? (
            <Link
              to={`/dashboard/terapeuti/${item.id}`}
              state={navlink}
              onClick={() => handleAdaugaProgram()}
            >
              <ButtonCustom status={"adauga program"} />
            </Link>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
