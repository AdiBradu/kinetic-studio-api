import React, { useState, useEffect, useContext } from 'react';
import Input from '../../../Defaults/Input/Input.component.jsx';
import { AppContext } from '../../../../AppContext.js';

export default function InputsZone() {
  const { createItemObj } = useContext(AppContext);
  const setCreateItem = createItemObj[1];
  const [state, setState] = useState({
    denumire: '',
    tarif: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    setCreateItem(state);
  }, [state]);

  return (
    <div>
      <Input
        value={state.denumire}
        handleChange={handleChange}
        name="denumire"
        label={'denumire'}
        type={'text'}
        placeholder={'type'}
      />
      <Input
        value={state.tarif}
        handleChange={handleChange}
        name="tarif"
        label={'tarif'}
        type={'text'}
        placeholder={'type'}
      />
    </div>
  );
}
