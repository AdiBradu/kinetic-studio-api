import React, { useState, useContext } from "react";
import "./Programare.component.scss";
import SelectTerapeut from "../../Defaults/Select/SelectTerapeut/SelectTerapeut.component.jsx";
import SelectTimeSlot from "../../Defaults/Select/SelectTimeSlot/SelectTimeSlot.component.jsx";
import { AppContext } from "../../../AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonContinue from "../../Defaults/Buttons/Continue/ButtonContinue.component";
import { checkIfProgramari, checkIfCalendar } from "../../../utils.js";
import useGetTerapeutCalendarAndProgramari from "../../../hooks/useGetTerapeutCalendarAndProgramari";
import useFilterTerapeuti from "../../../hooks/useFilterTerapeuti";
import useGetTimeslotsForDateAndTerapeut from "../../../hooks/useGetTimeslotsForDateAndTerapeut";
import useFilterHours from "../../../hooks/useFilterHours";
import useSetServiciuContext from "../../../hooks/useSetServiciuContext";
import { Link } from "react-router-dom";

export default function Programare() {
  const { comandaObj } = useContext(AppContext);
  const comanda = comandaObj[0];
  const [terapeutId, setTerapeutId] = useState({ id: "" });
  const [timeSlotStart, setTimeSlotStart] = useState();

  //Datepicker
  const [startDate, setStartDate] = useState();

  const { durataSedinta } = useSetServiciuContext(comanda.serviciu);
  const { filteredTerapeuti } = useFilterTerapeuti(comanda.specializare);
  const { terapeutCalendar, terapeutProgramari } =
    useGetTerapeutCalendarAndProgramari(terapeutId);
  const { calendarTimeslotsForDate, programariTimeslotsForDate } =
    useGetTimeslotsForDateAndTerapeut(
      startDate,
      terapeutCalendar,
      terapeutProgramari
    );
  const { filteredHours } = useFilterHours(
    calendarTimeslotsForDate,
    programariTimeslotsForDate,
    startDate,
    durataSedinta
  );

  //START
  //Actions selectors
  const handleChange = (e) => {
    const value = e.target.value;
    setTerapeutId({
      terapeut: value,
    });
  };

  const handleChangeTime = (e) => {
    setTimeSlotStart(e.target.value);
  };

  const handleContinue = () => {
    console.log(
      "Programeaza cu datele: ",
      "comanda",
      comanda.numar,
      "sedinta",
      comanda.sedinta,
      "terapeut:",
      terapeutId.terapeut,
      "data si ora:",
      startDate.setHours(0, 0, 0, 0) + parseInt(timeSlotStart, 10) * 60000
    );
  };
  //END

  return (
    <div className="programare">
      <SelectTerapeut
        value={terapeutId.terapeut}
        handleChange={handleChange}
        name="terapeut"
        label={"terapeut"}
        options={filteredTerapeuti}
      />
      {terapeutId.id !== "" && (
        <div className="calendar">
          <label>
            <p>Alege data</p>
          </label>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            dayClassName={(date) =>
              checkIfProgramari(terapeutProgramari, date)
                ? "active-programare"
                : checkIfCalendar(terapeutCalendar, date)
                ? "active-calendar"
                : "innactive"
            }
            minDate={new Date()}
            inline
          />
        </div>
      )}
      {startDate && (
        <SelectTimeSlot
          value={timeSlotStart}
          handleChange={handleChangeTime}
          name="time"
          label={"time"}
          options={filteredHours}
        />
      )}
      {timeSlotStart ? (
        <Link
          to={"/dashboard/comenzi"}
          state={"comenzi"}
          onClick={handleContinue}
        >
          <ButtonContinue />
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
