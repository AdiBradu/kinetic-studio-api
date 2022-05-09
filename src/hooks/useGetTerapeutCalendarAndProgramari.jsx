import { useState, useEffect } from "react";

const useGetTerapeutCalendarAndProgramari = (terapeutId) => {
  const [terapeuti, setTerapeuti] = useState([]);
  const [terapeutCalendar, setTerapeutCalendar] = useState([]);
  const [terapeutProgramari, setTerapeutProgramari] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/data/terapeuti.json`)
      .then((response) => response.json())
      .then((data) => setTerapeuti(data));
  }, []);

  useEffect(() => {
    if (terapeutId) {
      if (terapeutId.terapeut !== "") {
        for (let i = 0; i < terapeuti.length; i++) {
          if (terapeuti[i].id == terapeutId.terapeut) {
            setTerapeutCalendar(terapeuti[i].calendar);
            setTerapeutProgramari(terapeuti[i].programari);
          }
        }
      }
    }
  }, [terapeutId]);

  return { terapeutCalendar, terapeutProgramari };
};

export default useGetTerapeutCalendarAndProgramari;
