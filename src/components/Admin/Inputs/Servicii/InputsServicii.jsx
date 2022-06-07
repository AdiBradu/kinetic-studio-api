import React, { useState, useEffect, useContext } from 'react';
import Input from '../../../Defaults/Input/Input.component.jsx';
import { AppContext } from '../../../../AppContext.js';
import { useQuery } from '@apollo/client';
import { GET_ALL_M_TYPES } from '../../../../graphql/queries';
import { processMTypes } from '../../../../utils';
import SelectSpecializare from '../../../Defaults/Select/SelectSpecializare/SelectSpecializare.component.jsx';
import SelectImage from '../../../Defaults/SelectImage/SelectImage.component.jsx';

export default function InputsServicii() {
  const { createItemObj } = useContext(AppContext);
  const setCreateItem = createItemObj[1];

  const [state, setState] = useState({
    denumire: '',
    specializare: '',
    sedinte: '',
    durata: '',
    tarif: '',
    profile_picture_url: '',
  });

  const [mTypes, setMYpes] = useState([]);
  const mTypesQObj = useQuery(GET_ALL_M_TYPES);
  const queryData = mTypesQObj?.data ? mTypesQObj.data['getAllMTypes'] : [];

  useEffect(() => {
    if (queryData) {
      const processedData = processMTypes(queryData);
      if (processedData.length) {
        setMYpes(processedData);
      } else {
        setMYpes([]);
      }
    }
  }, [queryData]);

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const photoUpload = (value) => {
    setState({
      ...state,
      profile_picture_url: value,
    });
  };

  useEffect(() => {
    setCreateItem(state);
  }, [state]);

  return (
    <div>
      <SelectImage id={'tat'} handleChange={photoUpload} src={null} />
      <Input
        value={state.denumire}
        handleChange={handleChange}
        name="denumire"
        label={'denumire'}
        type={'text'}
        placeholder={'type'}
      />
      <SelectSpecializare
        value={state.specializare}
        handleChange={handleChange}
        label={'specializare'}
        options={mTypes}
        placeholder={''}
      />
      <Input
        value={state.sedinte}
        handleChange={handleChange}
        name="sedinte"
        label={'sedinte'}
        type={'text'}
        placeholder={'type'}
      />
      <Input
        value={state.durata}
        handleChange={handleChange}
        name="durata"
        label={'durata'}
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
