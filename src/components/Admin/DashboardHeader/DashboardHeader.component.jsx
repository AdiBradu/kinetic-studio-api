import React, { useContext } from "react";
import "./DashboardHeader.component.scss";
import { AppContext } from "../../../AppContext.js";
import { Link } from "react-router-dom";
import ButtonAdd from "../../Defaults/Buttons/Add/ButtonAdd.component.jsx";
import ButtonSave from "../../Defaults/Buttons/Save/ButtonSave.component.jsx";
import { useMatch } from "react-router";

export default function DashboardHeader({ state, item }) {
  const { isDesktop, createItemObj } = useContext(AppContext);
  const [createItem, setCreateItem] = createItemObj;
  const matchDashboard = useMatch("/dashboard");
  const matchAdd = useMatch("/dashboard/:id/adauga");
  const matchItem = useMatch("/dashboard/:id/:id");

  const handleSave = () => {
    console.log("Create item", createItem, "to", state);
    setCreateItem({});
  };

  return (
    <div className={isDesktop ? "container-fluid" : "container"}>
      <div className="dashboard-header">
        <h3>{state}</h3>
        {matchAdd ? (
          <Link
            to={`/dashboard/${state}`}
            state={state}
            onClick={() => handleSave()}
          >
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
    </div>
  );
}
