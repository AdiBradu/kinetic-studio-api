import React from 'react';
import './Modal.component.scss';
import ButtonConfirm from '../../Defaults/Buttons/Confirm/ButtonConfirm.component.jsx';
import { ReactComponent as Warning } from '../../../assets/Icons/Warning.svg';

export default function Modal() {
  const HandleConfirmation = () => {
    console.log('Delete from db item');
  };

  return (
    <div className="modal">
      <Warning />
      <p>Datele vor fi sterse din baza de date!</p>
      <div onClick={HandleConfirmation}>
        <ButtonConfirm />
      </div>
    </div>
  );
}
