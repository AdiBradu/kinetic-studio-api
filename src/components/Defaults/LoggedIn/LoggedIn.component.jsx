import React from 'react';
import './LoggedIn.component.scss';
import Thumbnail from '../../Admin/Thumbnail/Thumbnail.component.jsx';

export default function LoggedIn({ nume, prenume, thumbnail }) {
  return (
    <div className="logged-in">
      <p>{prenume}</p>
      <p>{nume}</p>
      <Thumbnail thumbnail={thumbnail} />
    </div>
  );
}
