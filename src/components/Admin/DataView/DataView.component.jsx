import React from "react";
import "./DataView.component.scss";

export default function DataView({ children }) {
  return <>{children && <div className="data-view">{children}</div>}</>;
}
