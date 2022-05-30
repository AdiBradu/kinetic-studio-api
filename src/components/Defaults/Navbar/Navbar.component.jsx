import React, { useContext } from "react";
import "./Navbar.component.scss";
import variables from "../../../styles/_variables.module.scss";
import LogoKineticStudio from "../Logos/KineticStudio/LogoKineticStudio.component.jsx";
import HamburgerMenu from "../Icons/HamburgerMenu/HamburgerMenu.component.jsx";
import Menu from "../../Admin/Menu/Menu.component.jsx";
import LoggedIn from "../LoggedIn/LoggedIn.component";
import { AppContext } from "../../../AppContext";

export default function Navbar() {
  const { isDesktop, isTablet, isMenuOpenObj, isLoggedInObj } = useContext(AppContext);
  const isMenuOpen = isMenuOpenObj[0];
  const [isLoggedIn, setIsLoggedIn] = isLoggedInObj;

  return (
    <div className="navbar" id="navbar">
      <div
        className={
          isTablet
            ? 'container-fluid flex mx-auto space-between padding align-center'
            : 'container flex mx-auto space-between padding align-center'
        }
      >
        <LogoKineticStudio color={variables.textDark} />
        {isLoggedIn && (
          <LoggedIn
            nume={"David"}
            prenume={"Mihai"}
            thumbnail={"/thumbnails/thmb01.jpg"}
          />
        )}
        {!isDesktop & isLoggedIn ? (
          <HamburgerMenu color={variables.textDark} />
        ) : (
          ""
        )}
      </div>
      {isMenuOpen && <Menu />}
    </div>
  );
}
