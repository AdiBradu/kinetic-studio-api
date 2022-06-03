import React, { useState, useEffect, useContext } from "react";
import "./InputsComenzi.component.scss";
import Input from "../../../Defaults/Input/Input.component.jsx";
import SelectTerapeut from "../../../Defaults/Select/SelectTerapeut/SelectTerapeut.component";
import { AppContext } from "../../../../AppContext.js";
import DatePicker from "react-datepicker";
import addMonths from 'addmonths';
import SelectTimeSlot from "../../../Defaults/Select/SelectTimeSlot/SelectTimeSlot.component";
import SelectServiciu from "../../../Defaults/Select/SelectServiciu/SelectServiciu.component";
import { checkIfCalendar, checkIfProgramari } from "../../../../utils.js";
import useGetTerapeutCalendarAndProgramari from "../../../../hooks/useGetTerapeutCalendarAndProgramari";
import useGetTimeslotsForDateAndTerapeut from "../../../../hooks/useGetTimeslotsForDateAndTerapeut";
import useSetServiciuContext from "../../../../hooks/useSetServiciuContext";
import useFilterTerapeuti from "../../../../hooks/useFilterTerapeuti";
import useCreateProgramari from "../../../../hooks/useCreateProgramari";
import useCreateComanda from "../../../../hooks/useCreateComanda";
import useFilterHours from "../../../../hooks/useFilterHours";

export default function InputsComenzi() {
  const { createItemObj } = useContext(AppContext);
  const setCreateItem = createItemObj[1];
  const [comanda, setComanda] = useState({
    nume: "",
    prenume: "",
    telefon: "",
    email: "",
    judet: "",
    localitate: "",
    strada: "",
    nr: "",
    serviciu: "",
    sedinte: "",
    specializare: "",
    programari: [],
  });

  const {
    servicii,
    specializare,
    sedinte,
    durataSedinta,
    terapeutId,
    setTerapeutId,
    terapeutCalendar,
    terapeutProgramari
  } = useSetServiciuContext(comanda.serviciu);

  const { filteredTerapeuti } = useFilterTerapeuti(specializare);

  //Datepicker
  const [startDate, setStartDate] = useState();
  //Timeslots
  const [timeSlotStart, setTimeSlotStart] = useState();

  const { programari } = useCreateProgramari(
    startDate,
    terapeutId,
    timeSlotStart,
    sedinte
  );

  useCreateComanda(programari, sedinte, specializare, comanda, setComanda);

  useEffect(() => {
    setCreateItem(comanda);
  }, [comanda]);

  //START
  //ACTIONS: handle changes in selectors
  const handleChangeTerapeut = (e) => {
    const value = e.target.value;
    setTerapeutId({
      [e.target.name]: value,
    });
  };

  const handleChangeTime = (e) => {
    setTimeSlotStart(e.target.value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setComanda({
      ...comanda,
      [e.target.name]: value,
    });
  };
  //END
  
  /* const { terapeutCalendar, terapeutProgramari } =
    useGetTerapeutCalendarAndProgramari(terapeutId); */
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
  
  return (
    <>
      {servicii && (
        <div className="inputs-comenzi">
          <div>
            <Input
              value={comanda.nume}
              handleChange={handleChange}
              name="nume"
              label={"nume"}
              type={"text"}
              placeholder={"type"}
            />
            <Input
              value={comanda.prenume}
              handleChange={handleChange}
              name="prenume"
              label={"prenume"}
              type={"text"}
              placeholder={"type"}
            />
            <Input
              value={comanda.telefon}
              handleChange={handleChange}
              name="telefon"
              label={"telefon"}
              type={"text"}
              placeholder={"type"}
            />
            <Input
              value={comanda.email}
              handleChange={handleChange}
              name="email"
              label={"email"}
              type={"email"}
              placeholder={"email"}
            />
            <Input
              value={comanda.judet}
              handleChange={handleChange}
              name="judet"
              label={"judet"}
              type={"text"}
              placeholder={"type"}
            />
            <Input
              value={comanda.localitate}
              handleChange={handleChange}
              name="localitate"
              label={"localitate"}
              type={"text"}
              placeholder={"type"}
            />
            <Input
              value={comanda.strada}
              handleChange={handleChange}
              name="strada"
              label={"strada"}
              type={"text"}
              placeholder={"type"}
            />
            <Input
              value={comanda.nr}
              handleChange={handleChange}
              name="nr"
              label={"nr"}
              type={"text"}
              placeholder={"type"}
            />
            <SelectServiciu
              value={comanda.serviciu}
              handleChange={handleChange}
              name="serviciu"
              label={"serviciu"}
              options={servicii}
            />
            {comanda.serviciu && (
              <SelectTerapeut
                value={terapeutId.id}
                handleChange={handleChangeTerapeut}
                name="terapeut"
                label={"terapeut"}
                options={filteredTerapeuti}
              />
            )}
            {terapeutId.id !== "" && (
              <div className="calendar">
                <label>
                  <p>Alege data</p>
                </label>
                <DatePicker
                  selected={startDate}
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
                  maxDate={addMonths(new Date(), 3)}
                  showDisabledMonthNavigation
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
          </div>
        </div>
      )}
    </>
  );
}
