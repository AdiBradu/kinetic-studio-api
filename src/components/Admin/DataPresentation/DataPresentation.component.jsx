import React, { useContext, useState, useEffect } from "react";
import variables from "../../../styles/_variables.module.scss";
import DeleteIcon from "../../Defaults/Icons/DeleteIcon/DeleteIcon.component.jsx";
import ViewIcon from "../../Defaults/Icons/ViewIcon/ViewIcon.component";
import { Link } from "react-router-dom";
import DataCell from "../DataCell/DataCell.component.jsx";
import DataCellActions from "../DataCell/DataCellActions/DataCellActions.component";
import useDataPresentation from "../../../hooks/useDataPresentation.jsx";
import Modal from "../Modals/Modal.component";
import { AppContext } from "../../../AppContext";
import { useLocation } from "react-router-dom";
import "./DataPresentation.component.scss";
import { processData } from "../../../utils";
import { useQuery } from "@apollo/client";
import { GET_ALL_M_TYPES, GET_ALL_AREAS, GET_ALL_SERVICES, GET_ALL_PARTNERS, MY_DATA, GET_ALL_ORDERS, GET_ALL_EMAILS } from "../../../graphql/queries";

export default function DataPresentation() {
  const { isTablet } = useContext(AppContext);  
  const [dataP, setDataP] = useState(null);  
  const location = useLocation();
  const navlink = location.state;

  let currentQuery;
  let currentQueryAlias;
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
        currentQueryAlias = 'getAllOrders';
      break;    
    case 'emails':       
        currentQuery = GET_ALL_EMAILS;
        currentQueryAlias = 'getAllEmails';
      break;  
    default:
      currentQuery = MY_DATA;
      currentQueryAlias = 'me';
      break;

  }
  const currentQObj = useQuery(currentQuery);
  const queryData = currentQObj?.data ? currentQObj.data[currentQueryAlias] : [];
  
  useEffect(() => {   
    if(queryData) {
      const processedData  = processData(queryData, navlink);    
      if(processedData.length){
        setDataP(processedData);
      } else {
        setDataP(null);
      }
    }
  }, [queryData, navlink])
 
  const { handleView, handleDelete, empty } = useDataPresentation(
    navlink
  );
  
  return (
    <>
      {dataP && (
        <>
          {isTablet ? (
            <div className="table">
              <div className="table-header">
                {Object.keys(dataP[0]).map((key, index) => (
                  <DataCell key={index}>{key}</DataCell>
                ))}
                <DataCell>{"Actions"}</DataCell>
              </div>
              {dataP.map((el, index) => (
                <div className="table-row" key={index}>
                  {Object.values(el).map((e, i) => (
                      <DataCell key={i}>{e}</DataCell>
                  ))}
                  <DataCellActions>
                    <Link
                      to={`/dashboard/${navlink}/${dataP[index].id}`}
                      state={navlink}
                      onClick={() => handleView(el)}
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
                    <div className="card-row">
                      <DataCell>{key}</DataCell>
                      <DataCell>{Object.values(el)[i]}</DataCell>
                    </div>
                  ))}
                  <div className="card-row">
                    <DataCell>{"actions"}</DataCell>
                    <DataCellActions>
                      <Link
                        to={`/dashboard/${navlink}/${dataP[index].id}`}
                        state={navlink}
                        onClick={() => handleView(el)}
                      >
                        <ViewIcon
                          color={variables.primaryColor}
                          bgColor={variables.primaryColorLight}
                        />
                      </Link>
                      <Link
                        to={`/dashboard/${navlink}`}
                        state={navlink}
                        onClick={() => handleDelete(el)}
                      >
                        <DeleteIcon
                          color={variables.primaryColor}
                          bgColor={variables.primaryColorLight}
                        />
                      </Link>
                    </DataCellActions>
                  </div>
                </div>
              ))}
            </div>
          )}
          {empty && <Modal />}
        </>
      )}
    </>
  );
}
