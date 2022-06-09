import React from 'react';
import './DataCell.component.scss';

export default function DataCell({ children }) {
  return (
    <div className="data-cell">
      <p>{children}</p>
    </div>
  );
}
