import React from "react";
import "./BigSaveButton.component.scss";

export default function BigSaveButton(props) {
  return (
    <button className="btn-admin-continue" onClick={props.onClick}>
      <p>salveaza</p>
    </button>
  );
}
