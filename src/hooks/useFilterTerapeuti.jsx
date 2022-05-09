import { useState, useEffect } from "react";

const useFilterTerapeuti = (specializare) => {

  const [terapeuti, setTerapeuti] = useState([]);
  const [filteredTerapeuti, setFilteredTerapeuti] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/data/terapeuti.json`)
      .then((response) => response.json())
      .then((data) => setTerapeuti(data));
  }, []);

  useEffect(() => {
    if (terapeuti) {
      const filteredArray = terapeuti.filter((terapeut) =>
        terapeut.specializare.includes(specializare)
      );
      setFilteredTerapeuti(filteredArray);
    }
  }, [terapeuti, specializare]);

  return { filteredTerapeuti };
};

export default useFilterTerapeuti;
