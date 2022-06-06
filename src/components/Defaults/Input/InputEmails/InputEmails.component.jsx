import React from "react";
import "./InputEmails.component.scss";

export default function InputEmails({
  label,
  value,
  type,
  placeholder,
  handleChange,
}) {  
  return (
    <div className="input-atom">
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
      />
    </div>
  );
}
