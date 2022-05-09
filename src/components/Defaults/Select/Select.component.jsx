import React from "react";
import "./Select.component.scss";

export default function Select({
  options,
  label,
  value,
  handleChange,
  placeholder,
}) {
  console.log(options);
  return (
    <>
      <div className="select-atom">
        {/* <label><p>{label}</p></label> */}
        <select name={label} onChange={handleChange} value={value}>
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options &&
            options.map((option, index) => (
              <option key={index}>{option.denumire}</option>
            ))}
        </select>
      </div>
    </>
  );
}
