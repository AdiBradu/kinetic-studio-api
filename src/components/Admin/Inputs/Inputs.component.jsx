import React from "react";
import "./Inputs.component.scss";
import InputsSpecializari from "./Specializari/InputsSpecializari.jsx";
import InputsZone from "./Zone/InputsZone";
import InputsServicii from "./Servicii/InputsServicii";
import InputsTerapeuti from "./Terapeuti/InputsTerapeuti.component";
import InputsComenzi from "./Comenzi/InputsComenzi.component";

export default function Inputs({ state }) {
  return (
    <div className="inputs">
      {state === "specializari" ? (
        <InputsSpecializari state={state} />
      ) : state === "zone" ? (
        <InputsZone state={state} />
      ) : state === "servicii" ? (
        <InputsServicii state={state} />
      ) : state === "terapeuti" ? (
        <InputsTerapeuti state={state} />
      ) : state === "comenzi" ? (
        <InputsComenzi navlink={state} />
      ) : (
        ""
      )}
    </div>
  );
}
