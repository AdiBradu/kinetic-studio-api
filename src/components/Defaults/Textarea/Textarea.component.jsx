import React from "react";
import "./Textarea.component.scss";

export default function Textarea({ value, handleChange, label, placeholder }) {
  return (
    <div className="textarea-atom">
      <label>
        <p>{label}</p>
      </label>
      <textarea
        value={value}
        name={label}
        placeholder={placeholder}
        onChange={handleChange}
        required
      ></textarea>
    </div>
  );
}
