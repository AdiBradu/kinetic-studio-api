import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_ALL_SERVICES } from "../graphql/queries";
import { processServices } from "../utils";
import useGetTerapeutCalendarAndProgramari from "./useGetTerapeutCalendarAndProgramari";

const useSetServiciuContext = (serviciu) => {

  const [servicii, setServicii] = useState();
  const [specializare, setSpecializare] = useState();
  const [sedinte, setSedinte] = useState(0);
  const [durataSedinta, setDurataSedinta] = useState();
  const [terapeutId, setTerapeutId] = useState({ id: "" });
  
  const servicesQObj = useQuery(GET_ALL_SERVICES);
  const queryData = servicesQObj?.data ? servicesQObj.data['getAllServices'] : [];
  
  useEffect(() => {   
    if(queryData) {
      const processedServices  = processServices(queryData);    
      if(processedServices.length){
        setServicii(processedServices);
      } 
    }
  }, [queryData])

  useEffect(() => {    
    if (servicii) {
      servicii.forEach((el) => {
        if (parseInt(serviciu) === el.id) {
          setSedinte(el.sedinte);
          setSpecializare(el.specializare);
          //Set terapeutId to nothing to repeat the process of selecting terapeut.
          //This leads to refreshing the checkIfProgramari and checkIfCalendar in Datepicker.
          setTerapeutId({ id: "" });
          setDurataSedinta(el.durata * 60000); //milliseconds
          
        }
      });
    }
  }, [serviciu, servicii]);

  const { terapeutCalendar, terapeutProgramari } =
    useGetTerapeutCalendarAndProgramari(terapeutId);

  return {
    specializare,
    sedinte,
    servicii,
    durataSedinta,
    terapeutId,
    setTerapeutId,
    terapeutCalendar,
    terapeutProgramari
  };
};

export default useSetServiciuContext;
