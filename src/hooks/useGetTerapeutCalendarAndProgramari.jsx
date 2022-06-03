import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_PARTNER_CURRENT_SCHEDULE, GET_PARTNER_FILLED_TIME_SLOTS } from "../graphql/queries.js";
import { processPartnerSched } from "../utils";

const useGetTerapeutCalendarAndProgramari = (terapeutId) => {
  const [terapeutCalendar, setTerapeutCalendar] = useState([]);
  const [terapeutProgramari, setTerapeutProgramari] = useState([]);
  
  const partnerSchedQObj = useQuery(GET_PARTNER_CURRENT_SCHEDULE, {variables: {id: parseFloat(terapeutId.terapeut)}});
  const querySchedData = partnerSchedQObj?.data ? partnerSchedQObj.data['getPartnerCurrentSchedule'] : [];
  
  const partnerFilledTSlotsQObj = useQuery(GET_PARTNER_FILLED_TIME_SLOTS, {variables: {id: parseFloat(terapeutId.terapeut)}});
  const queryFilledTSlotsData = partnerFilledTSlotsQObj?.data ? partnerFilledTSlotsQObj.data['getPartnerFilledTimeSlots'] : [];
  useEffect(() => {   
    if(querySchedData) {
      const processedSched  = processPartnerSched(querySchedData);    
      if(processedSched.length){
        setTerapeutCalendar(processedSched);
      } 
    }
    if(queryFilledTSlotsData) {
      const processedTSlots = processPartnerSched(queryFilledTSlotsData);    
      if(processedTSlots.length){
        setTerapeutProgramari(processedTSlots);
      } 
    }
  }, [querySchedData, queryFilledTSlotsData])
  
  return { terapeutCalendar, terapeutProgramari };
};

export default useGetTerapeutCalendarAndProgramari;
