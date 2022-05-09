import React, { useContext } from "react";
import "./Dashboard.component.scss";
import { useMatch } from "react-router-dom";
import DashboardHeader from "../../DashboardHeader/DashboardHeader.component.jsx";
import Sidebar from "../../Sidebar/Sidebar.component.jsx";
import DataView from "../../DataView/DataView.component.jsx";
import { AppContext } from "../../../../AppContext";
import Inputs from "../../Inputs/Inputs.component.jsx";
import Item from "../../Item/Item.component.jsx";
import { useLocation } from "react-router-dom";
import DataPresentation from "../../DataPresentation/DataPresentation.component";
import Programare from "../../Programare/Programare.component";
import Login from "../../../Defaults/LogIn/Login.component";

export default function Dashboard() {
  const { isDesktop, isLoggedInObj, itemObj } = useContext(AppContext);
  const item = itemObj[0];
  const location = useLocation();
  const state = location.state;

  const isLoggedIn = isLoggedInObj[0];
  const matchList = useMatch("/dashboard/:id");
  const matchAdd = useMatch("/dashboard/:id/adauga");
  const matchItem = useMatch("/dashboard/:id/:id");

  return (
    <div className="dashboard container-fluid">
      {isLoggedIn ? (
        <div className={isDesktop ? "dashboard-wrapper" : "container h100"}>
          {isDesktop && <Sidebar />}
          <div className="dashboard-group">
            {state && <DashboardHeader state={state} item={item} />}
            {state === "programare" ? (
              <DataView>
                <Programare item={item} />
              </DataView>
            ) : matchList ? (
              <DataView>
                <DataPresentation/>
              </DataView>
            ) : matchAdd ? (
              <DataView>
                <Inputs state={state} />
              </DataView>
            ) : matchItem ? (
              <DataView>
                <Item item={item} />
              </DataView>
            ) : (
              <DataView></DataView>
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
