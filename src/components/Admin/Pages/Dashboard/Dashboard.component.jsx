import React, { useContext, useEffect } from 'react';
import './Dashboard.component.scss';
import { useMatch } from 'react-router-dom';
import DashboardHeader from '../../DashboardHeader/DashboardHeader.component.jsx';
import Sidebar from '../../Sidebar/Sidebar.component.jsx';
import DataView from '../../DataView/DataView.component.jsx';
import { AppContext } from '../../../../AppContext';
import Inputs from '../../Inputs/Inputs.component.jsx';
import Edits from '../../Edits/Edits.component.jsx';
import Item from '../../Item/Item.component.jsx';
import { useLocation, Navigate } from 'react-router-dom';
import DataPresentation from '../../DataPresentation/DataPresentation.component';
import Programare from '../../Programare/Programare.component';
import User from '../../User/User.component';
import Emails from '../../Emails/Emails.component';
import { setDashboardHeight, resizeRadar } from '../../../../utils.js';

export default function Dashboard() {
  const { isDesktop, isLoggedInObj, itemObj } = useContext(AppContext);
  const item = itemObj[0];
  const location = useLocation();
  const state = location.state;

  const isLoggedIn = isLoggedInObj[0];
  const matchList = useMatch('/dashboard/:id');
  const matchAdd = useMatch('/dashboard/:id/adauga');
  const matchEdit = useMatch('/dashboard/:id/editeaza');
  const matchItem = useMatch('/dashboard/:id/:id');

  useEffect(() => {
    setDashboardHeight();
    resizeRadar(setDashboardHeight);
  }, []);

  return isLoggedIn ? (
    <div className="dashboard" id="dashboard">
      <div className="dashboard-wrapper">
        {isDesktop && <Sidebar />}
        <div className="dashboard-group">
          {state && <DashboardHeader state={state} item={item} />}
          {state === 'programare' ? (
            <DataView>
              <Programare item={item} />
            </DataView>
          ) : state === 'emails' ? (
            <DataView>
              <Emails item={item} />
            </DataView>
          ) : matchList ? (
            <DataView>
              <DataPresentation state={state} />
            </DataView>
          ) : matchAdd ? (
            <DataView>
              <Inputs state={state} />
            </DataView>
          ) : matchEdit ? (
            <DataView>
              <Edits state={state} />
            </DataView>
          ) : matchItem ? (
            state === 'admin' ? (
              <DataView>
                <User item={item} />
              </DataView>
            ) : (
              <DataView>
                <Item item={item} />
              </DataView>
            )
          ) : (
            <DataView></DataView>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
