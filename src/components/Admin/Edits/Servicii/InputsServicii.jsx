import React, { useState, useEffect, useContext } from 'react';
import Input from '../../../Defaults/Input/Input.component.jsx';
import { AppContext } from '../../../../AppContext.js';
import { useQuery } from '@apollo/client';
import { GET_ALL_M_TYPES } from '../../../../graphql/queries';
import { processMTypes } from '../../../../utils';
import SelectSpecializare from '../../../Defaults/Select/SelectSpecializare/SelectSpecializare.component.jsx';
import SelectImage from '../../../Defaults/SelectImage/SelectImage.component.jsx';

export default function InputsServicii() {
  const { createItemObj, itemObj } = useContext(AppContext);
  const item = itemObj[0];
  const setCreateItem = createItemObj[1];

  const [state, setState] = useState({
    id: item?.id,
    denumire: item?.denumire,
    specializare: item?.specializare,
    specializareId: '',
    sedinte: item?.sedinte,
    durata: item?.durata,
    tarif: item?.tarif,
    thumbnail: item?.thumbnail,
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

  useEffect(() => {
    if (mTypes) {
      mTypes.forEach((el) => {
        if (el.denumire.toLowerCase() === item.specializare.toLowerCase()) {
          setState({
            ...state,
            specializareId: el.id,
          });
        }
      });
    }
  }, [mTypes, item.specializare]);

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
      thumbnail: value,
    });
  };

  useEffect(() => {
    setCreateItem(state);
  }, [state]);

  return (
    <div>
      <SelectImage id={'tat'} handleChange={photoUpload} src={item.thumbnail} />
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
