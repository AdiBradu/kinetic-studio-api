import React, { useContext } from 'react';
import './LoggedIn.component.scss';
import Thumbnail from '../../Admin/Thumbnail/Thumbnail.component.jsx';
import { toCapitalCase } from '../../../utils.js';
import { AppContext } from '../../../AppContext';

export default function LoggedIn({ nume, prenume, thumbnail }) {
  const { isLoggedInObj } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = isLoggedInObj;

  return (
    <>
      {isLoggedIn === undefined || isLoggedIn === false ? (
        ''
      ) : (
        <div className="logged-in">
          <p>{toCapitalCase(prenume)}</p>
          <p>{toCapitalCase(nume)}</p>
          <Thumbnail thumbnail={thumbnail} />
        </div>
      )}
    </>
  );
}
