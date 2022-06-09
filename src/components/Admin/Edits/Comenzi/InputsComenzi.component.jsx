import React, { useState, useEffect, useContext } from 'react';
import './InputsComenzi.component.scss';
import Input from '../../../Defaults/Input/Input.component.jsx';
import SelectTerapeut from '../../../Defaults/Select/SelectTerapeut/SelectTerapeut.component';
import { AppContext } from '../../../../AppContext.js';
import DatePicker from 'react-datepicker';
import addMonths from 'addmonths';
import SelectTimeSlot from '../../../Defaults/Select/SelectTimeSlot/SelectTimeSlot.component';
import SelectServiciu from '../../../Defaults/Select/SelectServiciu/SelectServiciu.component';
import { checkIfCalendar, checkIfProgramari } from '../../../../utils.js';
import useGetTimeslotsForDateAndTerapeut from '../../../../hooks/useGetTimeslotsForDateAndTerapeut';
import useSetServiciuContext from '../../../../hooks/useSetServiciuContext';
import useFilterTerapeuti from '../../../../hooks/useFilterTerapeuti';
import useCreateProgramari from '../../../../hooks/useCreateProgramari';
import useCreateComanda from '../../../../hooks/useCreateComanda';
import useFilterHours from '../../../../hooks/useFilterHours';

export default function InputsComenzi() {
  const { createItemObj, itemObj } = useContext(AppContext);
  const item = itemObj[0];
  const setCreateItem = createItemObj[1];
  const [comanda, setComanda] = useState({
    nume: item?.nume || '',
    prenume: item?.prenume || '',
    telefon: item?.telefon || '',
    email: item?.email || '',
    judet: item?.judet || '',
    localitate: item?.localitate || '',
    strada: item?.strada || '',
    nr: item?.nr || '',
    serviciu: '',
    sedinte: item?.sedinte || '',
    specializare: '',
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
    terapeutProgramari,
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
    sedinte,
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
      terapeutProgramari,
    );

  const { filteredHours } = useFilterHours(
    calendarTimeslotsForDate,
    programariTimeslotsForDate,
    startDate,
    durataSedinta,
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
              label={'nume'}
              type={'text'}
              placeholder={'type'}
            />
            <Input
              value={comanda.prenume}
              handleChange={handleChange}
              name="prenume"
              label={'prenume'}
              type={'text'}
              placeholder={'type'}
            />
            <Input
              value={comanda.telefon}
              handleChange={handleChange}
              name="telefon"
              label={'telefon'}
              type={'text'}
              placeholder={'type'}
            />
            <Input
              value={comanda.email}
              handleChange={handleChange}
              name="email"
              label={'email'}
              type={'email'}
              placeholder={'email'}
            />
            <Input
              value={comanda.judet}
              handleChange={handleChange}
              name="judet"
              label={'judet'}
              type={'text'}
              placeholder={'type'}
            />
            <Input
              value={comanda.localitate}
              handleChange={handleChange}
              name="localitate"
              label={'localitate'}
              type={'text'}
              placeholder={'type'}
            />
            <Input
              value={comanda.strada}
              handleChange={handleChange}
              name="strada"
              label={'strada'}
              type={'text'}
              placeholder={'type'}
            />
            <Input
              value={comanda.nr}
              handleChange={handleChange}
              name="nr"
              label={'nr'}
              type={'text'}
              placeholder={'type'}
            />
          </div>
        </div>
      )}
    </>
  );
}
