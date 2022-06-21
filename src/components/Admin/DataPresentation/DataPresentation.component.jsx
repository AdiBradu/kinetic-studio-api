import React, { useContext, useState, useEffect, Suspense } from 'react';
import variables from '../../../styles/_variables.module.scss';
import DeleteIcon from '../../Defaults/Icons/DeleteIcon/DeleteIcon.component.jsx';
import ViewIcon from '../../Defaults/Icons/ViewIcon/ViewIcon.component';
import EditIcon from '../../Defaults/Icons/EditIcon/EditIcon.component';
import { Link } from 'react-router-dom';
import DataCell from '../DataCell/DataCell.component.jsx';
import DataCellActions from '../DataCell/DataCellActions/DataCellActions.component';
import useDataPresentation from '../../../hooks/useDataPresentation.jsx';
import Modal from '../Modals/Modal.component';
import { AppContext } from '../../../AppContext';
import { useLocation } from 'react-router-dom';
import './DataPresentation.component.scss';
import { processData } from '../../../utils';
import { useQuery } from '@apollo/client';
import Spinner from '../../Defaults/Spinner/Spinner.component.jsx';
import {
  GET_ALL_M_TYPES,
  GET_ALL_AREAS,
  GET_ALL_SERVICES,
  GET_ALL_PARTNERS,
  MY_DATA,
  GET_ALL_ORDERS,
  GET_ALL_EMAILS,
  GET_ALL_USERS,
} from '../../../graphql/queries';
import LoadMoreButton from '../../Defaults/Buttons/LoadMoreButton/LoadMoreButton.component';

export default function DataPresentation({ state }) {
  const { isDesktop } = useContext(AppContext);
  const [dataP, setDataP] = useState(null);
  const location = useLocation();
  const navlink = location.state;
  const [showMore, setShowMore] = useState(false);
  const [displayClass, setDisplayClass] = useState();

  useEffect(() => {
    if (state === 'specializari') {
      setDisplayClass('display-specializari');
    }
    if (state === 'zone') {
      setDisplayClass('display-zone');
    }
    if (state === 'servicii') {
      setDisplayClass('display-servicii');
    }
    if (state === 'terapeuti') {
      setDisplayClass('display-terapeuti');
    }
    if (state === 'comenzi') {
      setDisplayClass('display-comenzi');
    }
    if (state === 'admin') {
      setDisplayClass('display-admin');
    }
  }, [state]);

  const qLimit = 50;
  let currentQuery;
  let currentQueryAlias;
  let currentVars = {};
  switch (navlink) {
    case 'specializari':
      currentQuery = GET_ALL_M_TYPES;
      currentQueryAlias = 'getAllMTypes';
      break;

    case 'zone':
      currentQuery = GET_ALL_AREAS;
      currentQueryAlias = 'getAllAreas';
      break;

    case 'servicii':
      currentQuery = GET_ALL_SERVICES;
      currentQueryAlias = 'getAllServices';
      break;

    case 'terapeuti':
      currentQuery = GET_ALL_PARTNERS;
      currentQueryAlias = 'getAllPartners';
      break;
    case 'comenzi':
      currentQuery = GET_ALL_ORDERS;
      currentVars = { offset: 0, limit: qLimit };
      currentQueryAlias = 'getAllOrders';
      break;
    case 'emails':
      currentQuery = GET_ALL_EMAILS;
      currentQueryAlias = 'getAllEmails';
      break;
    case 'admin':
      currentQuery = GET_ALL_USERS;
      currentQueryAlias = 'getAllUsers';
      break;

    default:
      currentQuery = MY_DATA;
      currentQueryAlias = 'me';
      break;
  }

  const currentQObj = useQuery(currentQuery, { variables: currentVars });
  const queryData = currentQObj?.data
    ? currentQObj.data[currentQueryAlias]
    : [];

  useEffect(() => {
    if (queryData) {
      const processedData = processData(queryData, navlink);
      if (processedData.length) {
        setDataP(processedData);

        if (navlink === 'comenzi') {
          if (
            currentQObj?.data[currentQueryAlias][0]?.totalCount >
            currentQObj?.data[currentQueryAlias].length
          ) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } else {
        setDataP(null);
      }
    }
  }, [queryData, navlink]);

  const loadMore = () => {
    currentQObj.fetchMore({
      variables: {
        offset: currentQObj.data[currentQueryAlias].length,
      },
    });
  };

  const { handleView, handleDelete, empty } = useDataPresentation(navlink);

  return (
    <Suspense fallback={<Spinner />}>
      {dataP && (
        <>
          {isDesktop ? (
            <div className="table">
              <div className={`table-header ${displayClass}`}>
                {Object.keys(dataP[0]).map((key, index) => (
                  <DataCell key={index}>{key}</DataCell>
                ))}
                <DataCell>{'Actions'}</DataCell>
              </div>
              {dataP.map((el, index) => (
                <div className={`table-row ${displayClass}`} key={index}>
                  {Object.values(el).map((e, i) => (
                    <DataCell key={i}>{e}</DataCell>
                  ))}
                  <DataCellActions>
                    {state !== 'admin' ? (
                      <Link
                        to={`/dashboard/${state}/editeaza`}
                        state={state}
                        onClick={() => {
                          handleView(el);
                        }}
                      >
                        <EditIcon
                          color={variables.textDark}
                          bgColor={variables.backgroundLight}
                        />
                      </Link>
                    ) : (
                      ''
                    )}
                    <Link
                      to={`/dashboard/${navlink}/${dataP[index].id}`}
                      state={navlink}
                      onClick={() => {
                        handleView(el);
                      }}
                    >
                      <ViewIcon
                        color={variables.textDark}
                        bgColor={variables.backgroundLight}
                      />
                    </Link>
                    <Link
                      to={`/dashboard/${navlink}`}
                      state={navlink}
                      onClick={() => handleDelete(el)}
                    >
                      <DeleteIcon
                        color={variables.textDark}
                        bgColor={variables.backgroundLight}
                      />
                    </Link>
                  </DataCellActions>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-list">
              {dataP.map((el, index) => (
                <div className="card" key={index}>
                  {Object.keys(el).map((key, i) => (
                    <div className={`card-row ${displayClass}`} key={i}>
                      <DataCell>{key}</DataCell>
                      <DataCell>{Object.values(el)[i]}</DataCell>
                    </div>
                  ))}
                  <div className={`card-row ${displayClass}`}>
                    <DataCell>{'actions'}</DataCell>
                    <DataCellActions>
                      {state !== 'admin' ? (
                        <Link
                          to={`/dashboard/${state}/editeaza`}
                          state={state}
                          onClick={() => {
                            handleView(el);
                          }}
                        >
                          <EditIcon
                            color={variables.primaryColor}
                            bgColor={variables.backgroundLight}
                          />
                        </Link>
                      ) : (
                        ''
                      )}
                      <Link
                        to={`/dashboard/${navlink}/${dataP[index].id}`}
                        state={navlink}
                        onClick={() => handleView(el)}
                      >
                        <ViewIcon
                          color={variables.primaryColor}
                          bgColor={variables.backgroundLight}
                        />
                      </Link>
                      <Link
                        to={`/dashboard/${navlink}`}
                        state={navlink}
                        onClick={() => handleDelete(el)}
                      >
                        <DeleteIcon
                          color={variables.primaryColor}
                          bgColor={variables.backgroundLight}
                        />
                      </Link>
                    </DataCellActions>
                  </div>
                </div>
              ))}
            </div>
          )}
          {empty && <Modal />}
          {showMore && <LoadMoreButton onClick={loadMore} />}
        </>
      )}
    </Suspense>
  );
}
