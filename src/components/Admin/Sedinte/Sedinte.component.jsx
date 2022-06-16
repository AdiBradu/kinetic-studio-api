import React, { useContext, useEffect, useState } from 'react';
import './Sedinte.component.scss';
import { AppContext } from '../../../AppContext';
import DataCell from '../DataCell/DataCell.component';
import DataCellActions from '../DataCell/DataCellActions/DataCellActions.component';
import ButtonEdit from '../../Defaults/Buttons/Edit/ButtonEdit.component';
import { Link } from 'react-router-dom';
import { checkIfPastDate } from '../../../utils';
import useSetServiciuContext from '../../../hooks/useSetServiciuContext';
import { useQuery } from '@apollo/client';
import { GET_ALL_ORDER_DETAILS } from '../../../graphql/queries';
import { processOdets, toCapitalCase } from '../../../utils';

export default function Sedinte({ navlink, item }) {
  const { isTablet, comandaObj } = useContext(AppContext);
  const [comanda, setComanda] = comandaObj;
  const [comandaId, setComandaId] = useState();
  const [programari, setProgramari] = useState();

  const { specializare } = useSetServiciuContext(item.serviciu);

  const handleEdit = (e) => {
    setComanda({
      ...comanda,
      sedinta: e + 1,
      specializare: specializare,
      terapeut: programari[0].terapeut,
    });
  };

  const oDetsQObj = useQuery(GET_ALL_ORDER_DETAILS, {
    variables: { id: item.id },
  });
  const queryData = oDetsQObj?.data ? oDetsQObj.data['getAllOrderDetails'] : [];

  useEffect(() => {
    if (queryData) {
      const processedODets = processOdets(queryData);
      if (processedODets.length) {
        setComanda(item);
        setComandaId(item.id);
        setProgramari(processedODets);
      }
    }
  }, [queryData]);

  return (
    <>
      {comandaId && (
        <>
          {isTablet ? (
            <div className="table table-programare">
              <div className="table-header">
                <DataCell>{'sedinta'}</DataCell>
                <DataCell>{'terapeut'}</DataCell>
                <DataCell>{'data'}</DataCell>
                <DataCell>{'ora'}</DataCell>
                <DataCell>{'actions'}</DataCell>
              </div>

              {programari.map((el, index) => (
                <div className="table-row" key={index}>
                  <DataCell>{el.sedinta}</DataCell>
                  <DataCell>{el.numeTerapeut}</DataCell>
                  <DataCell>
                    {el.timeSlotStart > 0 ?
                      new Date(el.timeSlotStart).toLocaleDateString()
                      : 'TBD'
                    }
                  </DataCell>
                  <DataCell>
                    {el.timeSlotStart > 0 ?
                      new Date(el.timeSlotStart).getHours() +
                        `: ` +
                        new Date(el.timeSlotStart).getMinutes()
                      : 'TBD'
                    }
                  </DataCell>
                  <DataCellActions>
                    {checkIfPastDate(el) ? (
                      <Link
                        to={'/dashboard/programare'}
                        state={'programare'}
                        onClick={() => handleEdit(index)}
                      >
                        <ButtonEdit />
                      </Link>
                    ) : <p>Nepermis</p>}
                  </DataCellActions>
                </div>
              ))}
            </div>
          ) : (
            <>
              {programari.map((el, index) => (
                <div className="card card-programare">
                  <div className="card-row">
                    <DataCell>{'sedinta'}</DataCell>
                    <DataCell>{el.sedinta}</DataCell>
                  </div>
                  <div className="card-row">
                    <DataCell>{'terapeut'}</DataCell>
                    <DataCell>{el.numeTerapeut}</DataCell>
                  </div>
                  <div className="card-row">
                    <DataCell>{'data'}</DataCell>
                    <DataCell>
                    {el.timeSlotStart > 0 ?
                      new Date(el.timeSlotStart).toLocaleDateString()
                      : 'TBD'
                    }
                    </DataCell>
                  </div>
                  <div className="card-row">
                    <DataCell>{'ora'}</DataCell>
                    <DataCell>
                      {el.timeSlotStart > 0 ?
                        new Date(el.timeSlotStart).getHours() +
                          `: ` +
                          new Date(el.timeSlotStart).getMinutes()
                        : 'TBD'
                      }
                    </DataCell>
                  </div>
                  <div className="card-row">
                    <DataCell>{'actions'}</DataCell>
                    <DataCellActions>
                      {checkIfPastDate(el) ? (
                        <Link
                          to={'/dashboard/programare'}
                          state={'programare'}
                          onClick={() => handleEdit(index)}
                        >
                          <ButtonEdit />
                        </Link>
                      ) : <p>Nepermis</p>}
                    </DataCellActions>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
