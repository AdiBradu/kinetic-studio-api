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

export default function DataPresentation() {
  const { isTablet } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [dataP, setDataP] = useState(null);
  const location = useLocation();
  const navlink = location.state;

  useEffect(() => {
    fetch(`http://localhost:3000/data/${navlink}.json`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [navlink]);

  useEffect(() => {
    const processedData = data && processData(data, navlink);
    setDataP(processedData);
  }, [data])
  
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
