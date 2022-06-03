import React from "react";
import "./MultiServiciu.component.scss";
import Select from 'react-select';

export default function MultiServiciu({
  options,
  label,
  handleChange,
}) {  
  const handleTheChange = e => {
    let value = "";
    if(e.length) {
      e.forEach((el) => {
        value += el.value + ",";
      });
    }   
    value = value.replace(/,\s*$/, ""); 
    handleChange(value);
  }
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
        />
      </div>
    </>
  );
}