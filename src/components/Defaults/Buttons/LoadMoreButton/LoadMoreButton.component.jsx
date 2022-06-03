import React from "react";
import "./LoadMoreButton.component.scss";

export default function LoadMoreButton(props) {
  return (
    <button className="btn-admin-continue" onClick={props.onClick}>
      <p>load more</p>
    </button>
  );
}
