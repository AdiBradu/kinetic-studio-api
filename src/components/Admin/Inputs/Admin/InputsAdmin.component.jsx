import React, { useState, useEffect, useContext } from "react";
import Input from "../../../Defaults/Input/Input.component.jsx";
import SelectImage from "../../../Defaults/SelectImage/SelectImage.component.jsx";
import { AppContext } from "../../../../AppContext.js";

export default function InputsAdmin() {
  const { createItemObj } = useContext(AppContext);
  const setCreateItem = createItemObj[1];
  const [state, setState] = useState({
    nume: "",
    prenume: "",
    telefon: "",
    email: "",
    parola: "",
    confirma: "",
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
      <SelectImage id={"tat"} />
      <Input
        value={state.nume}
        handleChange={handleChange}
        name="nume"
        label={"nume"}
        type={"text"}
        placeholder={"type"}
      />
      <Input
        value={state.prenume}
        handleChange={handleChange}
        name="prenume"
        label={"prenume"}
        type={"text"}
        placeholder={"type"}
      />
      <Input
        value={state.telefon}
        handleChange={handleChange}
        name="telefon"
        label={"telefon"}
        type={"text"}
        placeholder={"type"}
      />
      <Input
        value={state.email}
        handleChange={handleChange}
        name="email"
        label={"email"}
        type={"email"}
        placeholder={"email"}
      />
      <Input
        value={state.parola}
        handleChange={handleChange}
        name="parola"
        label={"parola"}
        type={"password"}
        placeholder={"parola"}
      />
      <Input
        value={state.confirma}
        handleChange={handleChange}
        name="confirma"
        label={"confirma"}
        type={"password"}
        placeholder={"confirma parola"}
      />
    </div>
  );
}