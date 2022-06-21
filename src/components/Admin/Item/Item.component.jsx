import React, { useState, useEffect } from 'react';
import './Item.component.scss';
import Sedinte from '../Sedinte/Sedinte.component';
import DataCell from '../DataCell/DataCell.component';
import { useLocation } from 'react-router';
import DatePicker from 'react-datepicker';
import addMonths from 'addmonths';
import {
  checkIfProgramari,
  checkIfCalendar,
  minutesToTimestamp,
  timestampToHoursAndMinutes,
} from '../../../utils.js';
import useGetTerapeutCalendarAndProgramari from '../../../hooks/useGetTerapeutCalendarAndProgramari';
import useGetTimeslotsForDateAndTerapeut from '../../../hooks/useGetTimeslotsForDateAndTerapeut';
import useFilterHours from '../../../hooks/useFilterHours';
import SelectTimeSlot from '../../Defaults/Select/SelectTimeSlot/SelectTimeSlot.component.jsx';
import ButtonCustom from '../../Defaults/Buttons/CustomButton/ButtonCustom.component.jsx';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PARTNER_SCHEDULE } from '../../../graphql/mutations';
import { GET_PARTNER_CURRENT_SCHEDULE } from '../../../graphql/queries';
import User from '../User/User.component';

export default function Item({ item }) {
  const location = useLocation();
  const navlink = location.state;
  const [displayClass, setDisplayClass] = useState();

  //Datepicker
  const [startDate, setStartDate] = useState(new Date());

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const [timeSlotStart, setTimeSlotStart] = useState();
  const [timeSlotEnd, setTimeSlotEnd] = useState();

  const [timeSlotSuccess, setTimeSlotSuccess] = useState(false);
  const [timeSlotError, setTimeSlotError] = useState(false);

  const [createPSchd, createPSchdObj] = useMutation(CREATE_PARTNER_SCHEDULE);

  const handleChangeTimeSlotStart = (e) => {
    setStartTime(e.target.value);
  };

  const handleChangeTimeSlotEnd = (e) => {
    setEndTime(e.target.value);
  };

  useEffect(() => {
    setTimeSlotStart(minutesToTimestamp(startTime, startDate));
    setTimeSlotEnd(minutesToTimestamp(endTime, startDate));
  }, [startDate, startTime, endTime]);

  const handleAdaugaProgram = async () => {
    let newPSchd = await createPSchd({
      variables: {
        id: parseFloat(item.id),
        startTime: parseFloat(timeSlotStart),
        endTime: parseFloat(timeSlotEnd),
      },
      refetchQueries: [
        {
          query: GET_PARTNER_CURRENT_SCHEDULE,
          variables: { id: parseFloat(item.id) },
        },
      ],
    });

    if (newPSchd.errors) {
      setTimeSlotError(true);
    } else {
      setTimeSlotSuccess(true);
      setTimeout(() => {
        setTimeSlotSuccess(false);
      }, 3000);
    }
  };

  const { terapeutCalendar, terapeutProgramari } =
    useGetTerapeutCalendarAndProgramari({ terapeut: item.id });
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
  );

  useEffect(() => {
    if (navlink === 'specializari') {
      setDisplayClass('display-specializari');
    }
    if (navlink === 'zone') {
      setDisplayClass('display-zone');
    }
    if (navlink === 'servicii') {
      setDisplayClass('display-servicii');
    }
    if (navlink === 'terapeuti') {
      setDisplayClass('display-terapeuti');
    }
    if (navlink === 'comenzi') {
      setDisplayClass('display-comenzi');
    }
    if (navlink === 'admin') {
      setDisplayClass('display-admin');
    }
  }, [navlink]);

  return (
    <div className="item">
      <div className="card">
        {Object.keys(item).map((key, index) => (
          <div className={`card-row ${displayClass}`} key={index}>
            <DataCell>{key}</DataCell>
            <DataCell>{Object.values(item)[index]}</DataCell>
          </div>
        ))}
      </div>
      {navlink === 'comenzi' && <Sedinte navlink={navlink} item={item} />}
      {navlink === 'terapeuti' && (
        <div className="calendar">
          <h3>Program terapeut</h3>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            dayClassName={(date) =>
              checkIfProgramari(terapeutProgramari, date)
                ? 'active-programare'
                : checkIfCalendar(terapeutCalendar, date)
                ? 'active-calendar'
                : 'open-calendar'
            }
            minDate={new Date()}
            maxDate={addMonths(new Date(), 3)}
            showDisabledMonthNavigation
            inline
          />
          {!programariTimeslotsForDate.start ? (
            <>
              {calendarTimeslotsForDate.start && (
                <p className="info-message">{`Exista un program stabilit pentru aceasta zi. ${timestampToHoursAndMinutes(
                  calendarTimeslotsForDate.start,
                )} - ${timestampToHoursAndMinutes(
                  calendarTimeslotsForDate.end,
                )}`}</p>
              )}
              {timeSlotSuccess && (
                <p className="success-message">{`Adaugat cu succes`}</p>
              )}
              {timeSlotError && (
                <p className="warning-message">{`Eroare adaugare program`}</p>
              )}
              <SelectTimeSlot
                handleChange={handleChangeTimeSlotStart}
                label={'start time'}
                placeholder="alege ora"
                options={filteredHours}
              />
              <SelectTimeSlot
                handleChange={handleChangeTimeSlotEnd}
                label={'end time'}
                placeholder="alege ora"
                options={filteredHours}
              />
            </>
          ) : (
            <p className="warning-message">{`Exista programari in acesta zi si nu poti modifica programul! ${timestampToHoursAndMinutes(
              programariTimeslotsForDate.start,
            )} - ${timestampToHoursAndMinutes(
              programariTimeslotsForDate.end,
            )}`}</p>
          )}

          <Link
            to={`/dashboard/terapeuti/${item.id}`}
            state={navlink}
            onClick={() => handleAdaugaProgram()}
            item={item}
          >
            <ButtonCustom status={'adauga program'} />
          </Link>
        </div>
      )}
      {navlink === 'admin' && <User navlink={navlink} item={item} />}
    </div>
  );
}
