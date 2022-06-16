import React, { useRef } from 'react';
import './MultiServiciu.component.scss';
import Select from 'react-select';
import { checkIfActiveElement } from '../../../../utils.js';

export default function MultiServiciu({ options, label, handleChange }) {
  const handleTheChange = (e) => {
    let value = '';
    if (e.length) {
      e.forEach((el) => {
        value += el.value + ', ';
      });
    }
    value = value.replace(/,\s*$/, '');
    handleChange(value);
  };

  const inputRef = useRef(null);
  checkIfActiveElement(inputRef);

  return (
    <>
      <div className="select-atom">
        <label>
          <p>{label}</p>
        </label>
        <Select
          options={options}
          isMulti={true}
          onChange={handleTheChange}
          ref={inputRef}
        />
      </div>
    </>
  );
}
