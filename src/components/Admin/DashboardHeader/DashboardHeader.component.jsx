import React, { useContext } from "react";
import "./DashboardHeader.component.scss";
import { AppContext } from "../../../AppContext.js";
import { Link } from "react-router-dom";
import ButtonAdd from "../../Defaults/Buttons/Add/ButtonAdd.component.jsx";
import ButtonSave from "../../Defaults/Buttons/Save/ButtonSave.component.jsx";
import { useMatch } from "react-router";
import { useMutation } from "@apollo/client";
import { CREATE_AREA, UPDATE_AREA, DELETE_AREA, CREATE_M_TYPE, UPDATE_M_TYPE, DELETE_M_TYPE } from "../../../graphql/mutations";
import { GET_ALL_AREAS, GET_ALL_M_TYPES } from "../../../graphql/queries";

export default function DashboardHeader({ state, item }) {
  const { isDesktop, createItemObj } = useContext(AppContext);
  const [createItem, setCreateItem] = createItemObj;
  const matchDashboard = useMatch("/dashboard");
  const matchAdd = useMatch("/dashboard/:id/adauga");
  const matchItem = useMatch("/dashboard/:id/:id");

  const [createArea, createAreaObj] = useMutation(CREATE_AREA);
  const [updateArea, updateAreaObj] = useMutation(UPDATE_AREA);
  const [deleteArea, deleteAreaObj] = useMutation(DELETE_AREA);

  const [createMType, createMTypeObj] = useMutation(CREATE_M_TYPE);
  const [updateMType, updateMTypeObj] = useMutation(UPDATE_M_TYPE);
  const [deleteMType, deleteMTypeObj] = useMutation(DELETE_M_TYPE);

  const handleSave = async () => {
    console.log("Create item", createItem, "to", state);
    switch (state) {
      case "zone":          
          await createArea({variables: {name: createItem.denumire, extra_charge: parseFloat(createItem.tarif)}, refetchQueries: [ { query: GET_ALL_AREAS }]});
          /* console.log('createAreaObj.data.createArea.successful: ', createAreaObj.data.createArea.successful); */
        break;
      case "specializari":          
          await createMType({variables: {name: createItem.denumire}, refetchQueries: [ { query: GET_ALL_M_TYPES }]});
        break;
  
      default:
        break;
    }
    setCreateItem({});
  };

  return (

      <div className="dashboard-header padding">
        <h3>{state}</h3>
        {matchAdd ? (
          <Link 
            to={`/dashboard/${state}`} 
            onClick={() => handleSave()}
            state={state}>
            <ButtonSave />
          </Link>
        
        ) : matchItem ? (
          <Link to={`/dashboard/${state}/adauga`} state={state}>
            {state !== "programare" && <ButtonAdd />}
          </Link>
        ) : matchDashboard ? (
          ""
        ) : (
          <Link to={`/dashboard/${state}/adauga`} state={state}>
            {state !== "programare" && <ButtonAdd />}
          </Link>
        )}
      </div>

  );
}
