import React, { useRef } from 'react';
import './InputPassword.component.scss';
import { checkIfActiveElement } from '../../../../utils.js';
import { Link, useNavigate } from 'react-router-dom';

export default function InputPassword({
  label,
  value,
  type,
  placeholder,
  handleChange,
  handleLogin,
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
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
      />
    </div>
  );
}
