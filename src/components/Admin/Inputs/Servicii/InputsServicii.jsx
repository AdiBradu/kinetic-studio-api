import React, { useState, useEffect, useContext } from "react";
import Input from "../../../Defaults/Input/Input.component.jsx";
import { AppContext } from "../../../../AppContext.js";

export default function InputsServicii() {
  const { createItemObj } = useContext(AppContext);
  const setCreateItem = createItemObj[1];
  const [state, setState] = useState({
    denumire: "",
    specializare: "",
    sedinte: "",
    durata: "",
    tarif: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    setCreateItem(state);
  }, [state]);

  return (
    <div>
      <Input
        value={state.denumire}
        handleChange={handleChange}
        name="denumire"
        label={"denumire"}
        type={"text"}
        placeholder={"type"}
      />
      <Input
        value={state.specializare}
        handleChange={handleChange}
        name="specializare"
        label={"specializare"}
        type={"text"}
        placeholder={"type"}
      />
      <Input
        value={state.sedinte}
        handleChange={handleChange}
        name="sedinte"
        label={"sedinte"}
        type={"text"}
        placeholder={"type"}
      />
      <Input
        value={state.durata}
        handleChange={handleChange}
        name="durata"
        label={"durata"}
        type={"text"}
        placeholder={"type"}
      />
      <Input
        value={state.tarif}
        handleChange={handleChange}
        name="tarif"
        label={"tarif"}
        type={"text"}
        placeholder={"type"}
      />
    </div>
  );
}
