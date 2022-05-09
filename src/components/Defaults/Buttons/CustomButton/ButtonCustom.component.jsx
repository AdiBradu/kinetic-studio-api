import React from "react";
import "./ButtonCustom.component.scss";

export default function ButtonCustom({ status }) {
  return (
    <button className="btn-admin-continue">
      <p>{status}</p>
    </button>
  );
}
