import React, { useRef } from 'react';
import './Input.component.scss';
import { checkIfActiveElement } from '../../../utils.js';

export default function Input({
  label,
  value,
  type,
  placeholder,
  handleChange,
}) {
  const inputRef = useRef(null);
  checkIfActiveElement(inputRef);

  return (
    <div className="input-atom" id={label}>
      <label>
        <p>{label}</p>
      </label>
      <input
        value={value}
        name={label}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        required
        ref={inputRef}
      />
    </div>
  );
}
