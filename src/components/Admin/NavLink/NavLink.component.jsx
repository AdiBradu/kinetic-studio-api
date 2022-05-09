import React, { useContext, useEffect, useState } from "react";
import "./NavLink.component.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import { useLocation } from "react-router";

export default function NavLink({ navlink }) {
  const location = useLocation();
  const currentLocation = location.state;
  const { isMenuOpenObj, isDesktop, isLoggedInObj } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = isMenuOpenObj;
  const [isLoggedIn, setIsLoggedIn] = isLoggedInObj;
  const [active, setActive] = useState(false);

  const handleNavLinkClick = () => {
    !isDesktop && setIsMenuOpen(!isMenuOpen);
    handleLogOut();
  };

  const handleLogOut = () => {
    if ((navlink === "log out") & isLoggedIn) {
      setIsLoggedIn(false);
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
