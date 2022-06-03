import React from "react";
import "./InputEmails.component.scss";

export default function InputEmails({
  label,
  value,  
  type,
  name,
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
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </div>
  );
}
