import { useState, useEffect } from "react";

const useSetServiciuContext = (serviciu) => {

  const [servicii, setServicii] = useState();
  const [specializare, setSpecializare] = useState();
  const [sedinte, setSedinte] = useState(0);
  const [durataSedinta, setDurataSedinta] = useState();
  const [terapeutId, setTerapeutId] = useState({ id: "" });
  useEffect(() => {
    fetch(`http://localhost:3000/data/servicii.json`)
      .then((response) => response.json())
      .then((data) => setServicii(data));
  }, []);

  useEffect(() => {
    if (servicii) {
      servicii.forEach((el) => {
        if (serviciu === el.denumire) {
          setSedinte(el.sedinte);
          setSpecializare(el.specializare);
          //Set terapeutId to nothing to repeat the process of selecting terapeut.
          //This leads to refreshing the checkIfProgramari and checkIfCalendar in Datepicker.
          setTerapeutId({ id: "" });
          setDurataSedinta((el.durata + 60) * 60000); //milliseconds
        }
      });
    }
  }, [serviciu, servicii]);

  return {
    specializare,
    sedinte,
    servicii,
    durataSedinta,
    terapeutId,
    setTerapeutId,
  };
};

export default useSetServiciuContext;
