import React, { useState, useEffect, useContext } from 'react';
import Input from '../../../Defaults/Input/Input.component.jsx';
import Textarea from '../../../Defaults/Textarea/Textarea.component.jsx';
import SelectImage from '../../../Defaults/SelectImage/SelectImage.component.jsx';
import { AppContext } from '../../../../AppContext.js';
import MultiServiciu from '../../../Defaults/Select/MultiServiciu/MultiServiciu.component.jsx';
import { useQuery } from '@apollo/client';
import { GET_ALL_M_TYPES } from '../../../../graphql/queries.js';
import { processMultiMTypes } from '../../../../utils.js';

export default function InputsTerapeuti() {
  const { createItemObj, itemObj } = useContext(AppContext);
  const item = itemObj[0];
  const setCreateItem = createItemObj[1];
  const [state, setState] = useState({
    nume: item?.nume || '',
    prenume: item?.prenume || '',
    telefon: item?.telefon || '',
    email: item?.email || '',
    profile_picture_url: item?.profile_picture_url || '',
    descriere: item?.descriere || '',
    specializari: item?.specializari || '',
  });

  const [mTypes, setMYpes] = useState([]);
  const mTypesQObj = useQuery(GET_ALL_M_TYPES);
  const queryData = mTypesQObj?.data ? mTypesQObj.data['getAllMTypes'] : [];

  useEffect(() => {
    if (queryData) {
      const processedData = processMultiMTypes(queryData);
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

  const handleSpecializari = (value) => {
    setState({
      ...state,
      specializari: value,
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
        value={state.nume}
        handleChange={handleChange}
        name="nume"
        label={'nume'}
        type={'text'}
        placeholder={'type'}
      />
      <Input
        value={state.prenume}
        handleChange={handleChange}
        name="prenume"
        label={'prenume'}
        type={'text'}
        placeholder={'type'}
      />
      <Input
        value={state.telefon}
        handleChange={handleChange}
        name="telefon"
        label={'telefon'}
        type={'text'}
        placeholder={'type'}
      />
      <Input
        value={state.email}
        handleChange={handleChange}
        name="email"
        label={'email'}
        type={'email'}
        placeholder={'email'}
      />
      <MultiServiciu
        label={'specializari'}
        handleChange={handleSpecializari}
        options={mTypes}
      />
      <Textarea
        value={state.descriere}
        handleChange={handleChange}
        name="descriere"
        label={'descriere'}
        placeholder={'descriere terapeut'}
      />
    </div>
  );
}
