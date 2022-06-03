import React from "react";
import "./SelectSpecializare.component.scss";

export default function SelectSpecializare({
  options,
  label,
  value,
  handleChange,
  placeholder,
}) {
  return (
    <>
      <div className="select-atom">
        <label>
          <p>Specializare</p>
        </label>
        <select name={label} onChange={handleChange} value={value}>         
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.id}>{option.denumire}</option>
            ))}
        </select>
      </div>
    </>
  );
}