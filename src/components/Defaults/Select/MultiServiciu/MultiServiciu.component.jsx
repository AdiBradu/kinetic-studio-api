import React, { useRef } from 'react';
import './MultiServiciu.component.scss';
import Select from 'react-select';
import { checkIfActiveElement } from '../../../../utils.js';
import variables from '../../../../styles/_variables.module.scss';

export default function MultiServiciu({ options, label, value, handleChange }) {
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: variables.primaryColorExtraLight,
      borderColor: variables.border,
    }),
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
          styles={customStyles}
        />
      </div>
    </>
  );
}
