import React, { useContext, useEffect, useState } from "react";
import { useApolloClient, useMutation } from '@apollo/client';
import "./NavLink.component.scss";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import { useLocation } from "react-router";
import { LOGOUT } from '../../../graphql/mutations';

export default function NavLink({ navlink }) {
  const location = useLocation();
  const currentLocation = location.state;
  const { isMenuOpenObj, isDesktop, isLoggedInObj } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = isMenuOpenObj;
  const [isLoggedIn, setIsLoggedIn] = isLoggedInObj;
  const [active, setActive] = useState(false);
  let navigate = useNavigate();
  const client = useApolloClient();

  const handleNavLinkClick = () => {
    !isDesktop && setIsMenuOpen(!isMenuOpen);
    handleLogOut();
  };

  const [logoutUsr, logoutUsrObj] = useMutation(LOGOUT);
  const handleLogOut = () => {
    if ((navlink === "log out") && isLoggedIn) {
      sessionStorage.removeItem('item');
      setIsLoggedIn(false);
      logoutUsr();
      client.clearStore();
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    navlink === currentLocation ? setActive(true) : setActive(false);
  }, [navlink, currentLocation]);

  return (
    <Link
      to={navlink === "log out" ? `/` : `/dashboard/${navlink}`}
      state={`${navlink}`}
      onClick={handleNavLinkClick}
    >
      <div className={active ? "navlink-admin active" : "navlink-admin"}>
        <p>{navlink}</p>
      </div>
    </Link>
  );
}
