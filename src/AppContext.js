import React, { useState, createContext } from "react";
import { useMediaQuery } from "react-responsive";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const isMobile = useMediaQuery({ query: `(min-width: 0px)` });
  const isTablet = useMediaQuery({ query: `(min-width: 800px)` });
  const isDesktop = useMediaQuery({ query: `(min-width: 1440px)` });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isToggled, setIsToggled] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [item, setItem] = useState();
  const [createItem, setCreateItem] = useState({});
  const [deleteItem, setDeleteItem] = useState();
  const [comanda, setComanda] = useState();

  return (
    <AppContext.Provider
      value={{
        isToggledObj: [isToggled, setIsToggled],
        isMenuOpenObj: [isMenuOpen, setIsMenuOpen],
        isLoggedInObj: [isLoggedIn, setIsLoggedIn],
        itemObj: [item, setItem],
        createItemObj: [createItem, setCreateItem],
        deleteItemObj: [deleteItem, setDeleteItem],
        comandaObj: [comanda, setComanda],
        isMobile,
        isTablet,
        isDesktop,
        isPortrait,
        isLandscape,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
