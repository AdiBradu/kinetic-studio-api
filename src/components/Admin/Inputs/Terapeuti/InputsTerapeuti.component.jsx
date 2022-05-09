import React, { useState, useEffect, useContext } from "react";
import Input from "../../../Defaults/Input/Input.component.jsx";
import Textarea from "../../../Defaults/Textarea/Textarea.component.jsx";
import SelectImage from "../../../Defaults/SelectImage/SelectImage.component.jsx";
import { AppContext } from "../../../../AppContext.js";

export default function InputsTerapeuti() {
  const { createItemObj } = useContext(AppContext);
  const setCreateItem = createItemObj[1];
  const [state, setState] = useState({
    nume: "",
    prenume: "",
    telefon: "",
    email: "",
    descriere: "",
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
      <Textarea
        value={state.descriere}
        handleChange={handleChange}
        name="descriere"
        label={"descriere"}
        placeholder={"descriere terapeut"}
      />
    </div>
  );
}
