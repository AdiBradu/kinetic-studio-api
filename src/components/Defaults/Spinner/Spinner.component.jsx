import React from 'react';
import './Spinner.component.scss';

export default function Spinner() {
  return (
    <div className="spinner">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
