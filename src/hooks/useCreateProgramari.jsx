import { useState, useEffect } from "react";

const useCreateProgramari = (startDate, terapeutId, timeSlotStart, sedinte) => {
  const [programari, setProgramari] = useState();

  //SET PROGRAMARE
  useEffect(() => {
    if (startDate) {
      const programari = [];
      const programareInitiala = {
        sedinta: 1,
        terapeut: terapeutId.terapeut,
        timeSlotStart:
          startDate.setHours(0, 0, 0, 0) + parseInt(timeSlotStart, 10) * 60000,
        timeSlotEnd:
          startDate.setHours(0, 0, 0, 0) +
          (parseInt(timeSlotStart, 10) + 60) * 60000,
      };
      programari.push(programareInitiala);
      for (let i = 1; i < sedinte; i++) {
        const programare = {
          sedinta: i + 1,
          terapeut: "TBD",
          timeSlotStart: "TBD",
          timeSlotEnd: "TBD",
        };
        programari.push(programare);
      }
      setProgramari(programari);
    }
  }, [startDate, timeSlotStart]);

  return { programari };
};
export default useCreateProgramari;
