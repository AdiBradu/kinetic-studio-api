import React, { useState, useEffect, useContext } from 'react';
import Input from '../../../Defaults/Input/Input.component.jsx';
import { AppContext } from '../../../../AppContext.js';

export default function InputsSpecializari() {
  const { createItemObj, itemObj } = useContext(AppContext);
  const setCreateItem = createItemObj[1];
  const item = itemObj[0];
  const [state, setState] = useState({ denumire: item?.denumire || '' });

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
    </div>
  );
}
