import React, { useRef } from 'react';
import './SelectSpecializare.component.scss';
import { checkIfActiveElement } from '../../../../utils.js';

export default function SelectSpecializare({
  options,
  label,
  value,
  handleChange,
  placeholder,
}) {
  const inputRef = useRef(null);
  checkIfActiveElement(inputRef);

  return (
    <>
      <div className="select-atom">
        <label>
          <p>Specializare</p>
        </label>
        <select
          name={label}
          onChange={handleChange}
          value={value}
          ref={inputRef}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.id}>
                {option.denumire}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
