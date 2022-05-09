import React from "react";
import "./SelectTimeSlot.component.scss";

export default function SelectTimeSlot({
  label,
  value,
  handleChange,
  options,
}) {

  const convertToTime = (input) => {
    let hours = Math.floor(input / 60);
    let minutes = input % 60;
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <div className="select-atom">
        <label>
          <p>Alege ora</p>
        </label>
        <select name={label} onChange={handleChange} value={value}>
          {<option disabled hidden></option>}
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {convertToTime(option)}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
