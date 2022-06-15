import React from 'react';
import './LoggedIn.component.scss';
import Thumbnail from '../../Admin/Thumbnail/Thumbnail.component.jsx';
import {toCapitalCase} from '../../../utils.js'

export default function LoggedIn({ nume, prenume, thumbnail }) {
  return (
    <div className="logged-in">
      <p>{toCapitalCase(prenume)}</p>
      <p>{toCapitalCase(nume)}</p>
      <Thumbnail thumbnail={thumbnail} />
    </div>
  );
}
