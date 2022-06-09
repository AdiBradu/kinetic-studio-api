import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_ALL_PARTNERS } from '../graphql/queries';
import { processFilterPartners } from '../utils';

const useFilterTerapeuti = (specializare) => {
  const [terapeuti, setTerapeuti] = useState([]);
  const [filteredTerapeuti, setFilteredTerapeuti] = useState();

  const partnersQObj = useQuery(GET_ALL_PARTNERS);
  const queryData = partnersQObj?.data
    ? partnersQObj.data['getAllPartners']
    : [];

  useEffect(() => {
    if (queryData) {
      const processedPartners = processFilterPartners(queryData);
      if (processedPartners.length) {
        setTerapeuti(processedPartners);
      }
    }
  }, [queryData]);

  useEffect(() => {
    if (terapeuti) {
      if (specializare) {
        const filteredArray = terapeuti.filter((terapeut) =>
          terapeut.specializare.includes(specializare),
        );
        setFilteredTerapeuti(filteredArray);
      } else {
        setFilteredTerapeuti(terapeuti);
      }
    }
  }, [terapeuti, specializare]);

  return { filteredTerapeuti };
};

export default useFilterTerapeuti;
