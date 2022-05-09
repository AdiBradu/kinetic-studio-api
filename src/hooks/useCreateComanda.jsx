import { useState, useEffect } from "react";

const useCreateComanda = (
  programari,
  sedinte,
  specializare,
  comanda,
  setComanda
) => {
  useEffect(() => {
    setComanda({
      ...comanda,
      programari: programari,
    });
  }, [programari]);

  useEffect(() => {
    setComanda({
      ...comanda,
      sedinte: sedinte,
      specializare: specializare,
    });
  }, [sedinte]);
};

export default useCreateComanda;
