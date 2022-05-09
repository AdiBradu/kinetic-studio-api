import React, { useContext, useEffect, useState } from "react";
import "./Sedinte.component.scss";
import { AppContext } from "../../../AppContext";
import DataCell from "../DataCell/DataCell.component";
import DataCellActions from "../DataCell/DataCellActions/DataCellActions.component";
import ButtonEdit from "../../Defaults/Buttons/Edit/ButtonEdit.component";
import { Link } from "react-router-dom";
import { checkIfPastDate } from "../../../utils";
import useSetServiciuContext from "../../../hooks/useSetServiciuContext";

export default function Sedinte({ navlink, item }) {
  const { isTablet, comandaObj } = useContext(AppContext);
  const [comanda, setComanda] = comandaObj;
  const [comenzi, setComenzi] = useState();
  const [comandaId, setComandaId] = useState();
  const [programari, setProgramari] = useState();

  const { specializare } = useSetServiciuContext(item.serviciu);

  const handleEdit = (e) => {
    setComanda({
      ...comanda,
      sedinta: e + 1,
      specializare: specializare,
    });
  };

  useEffect(() => {
    if (comanda) {
      setComandaId(comanda.id);
      setProgramari(comanda.programari);
    }
  }, [comanda]);

  useEffect(() => {
    navlink === "comenzi" &&
      fetch(`http://localhost:3000/data/comenzi.json`)
        .then((response) => response.json())
        .then((data) => setComenzi(data));
  }, []);

  useEffect(() => {
    comenzi &&
      comenzi.forEach((el) => {
        if (el.numar === item.numar) {
          setComanda(el);
        }
      });
  }, [comenzi]);

  return (
    <>
      {comandaId && (
        <>
          {isTablet ? (
            <div className="table table-programare">
              <div className="table-header">
                <DataCell>{"sedinta"}</DataCell>
                <DataCell>{"terapeut"}</DataCell>
                <DataCell>{"data"}</DataCell>
                <DataCell>{"ora"}</DataCell>
                <DataCell>{"actions"}</DataCell>
              </div>

              {programari.map((el, index) => (
                <div className="table-row" key={index}>
                  <DataCell>{el.sedinta}</DataCell>
                  <DataCell>{el.terapeut}</DataCell>
                  <DataCell>
                    {new Date(el.timeSlotStart).toLocaleDateString()}
                  </DataCell>
                  <DataCell>
                    {new Date(el.timeSlotStart).getHours()} :{" "}
                    {new Date(el.timeSlotStart).getMinutes()}
                  </DataCell>
                  <DataCellActions>
                    {checkIfPastDate(el) && (
                      <Link
                        to={"/dashboard/programare"}
                        state={"programare"}
                        onClick={() => handleEdit(index)}
                      >
                        <ButtonEdit />
                      </Link>
                    )}
                  </DataCellActions>
                </div>
              ))}
            </div>
          ) : (
            <>
              {programari.map((el, index) => (
                <div className="card card-programare">
                  <div className="card-row">
                    <DataCell>{"sedinta"}</DataCell>
                    <DataCell>{el.sedinta}</DataCell>
                  </div>
                  <div className="card-row">
                    <DataCell>{"terapeut"}</DataCell>
                    <DataCell>{el.terapeut}</DataCell>
                  </div>
                  <div className="card-row">
                    <DataCell>{"data"}</DataCell>
                    <DataCell>{new Date(el.timeSlotStart).getMonth()}</DataCell>
                  </div>
                  <div className="card-row">
                    <DataCell>{"ora"}</DataCell>
                    <DataCell>
                      {new Date(el.timeSlotStart).getHours()} :{" "}
                      {new Date(el.timeSlotStart).getMinutes()}
                    </DataCell>
                  </div>
                  <div className="card-row">
                    <DataCell>{"actions"}</DataCell>
                    <DataCellActions>
                      {checkIfPastDate(el) && (
                        <Link
                          to={"/dashboard/programare"}
                          state={"programare"}
                          onClick={() => handleEdit(index)}
                        >
                          <ButtonEdit />
                        </Link>
                      )}
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
