import React, { useRef } from 'react';
import './SelectTerapeut.component.scss';
import { checkIfActiveElement } from '../../../../utils.js';

export default function SelectTerapeut({
  options,
  label,
  name,
  value,
  handleChange,
}) {
  const inputRef = useRef(null);
  checkIfActiveElement(inputRef);

  return (
    <>
      <div className="select-atom">
        <label>
          <p>Alege terapeutul</p>
        </label>
        <select
          name={name}
          onChange={handleChange}
          value={value}
          ref={inputRef}
        >
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
