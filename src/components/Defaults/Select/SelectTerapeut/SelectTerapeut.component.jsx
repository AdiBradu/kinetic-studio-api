import React from "react";
import "./SelectTerapeut.component.scss";

export default function SelectTerapeut({
  options,
  label,
  name,
  value,
  handleChange,
}) {
  return (
    <>
      <div className="select-atom">
        <label>
          <p>Alege terapeutul</p>
        </label>
        <select name={name} onChange={handleChange} value={value}>
          {<option disabled hidden></option>}
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.id}>
                {option.nume} {option.prenume}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
