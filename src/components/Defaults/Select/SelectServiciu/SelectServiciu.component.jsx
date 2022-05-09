import React from "react";
import "./SelectServiciu.component.scss";

export default function SelectServiciu({
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
          <p>Alege serviciul</p>
        </label>
        <select name={name} onChange={handleChange} value={value}>
          {<option disabled hidden></option>}
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.denumire}>
                {option.denumire}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
