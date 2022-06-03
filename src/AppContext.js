import React, { useState, createContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@apollo/client";
import { MY_DATA } from "./graphql/queries";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const isMobile = useMediaQuery({ query: `(min-width: 0px)` });
  const isTablet = useMediaQuery({ query: `(min-width: 768px)` });
  const isDesktop = useMediaQuery({ query: `(min-width: 1440px)` });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });

  const [isToggled, setIsToggled] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [item, setItem] = useState(JSON.parse(sessionStorage.getItem('item')) || null);
  const [createItem, setCreateItem] = useState({});
  const [deleteItem, setDeleteItem] = useState();
  const [comanda, setComanda] = useState();
  const [user, setUser] = useState();    
  const [isLoggedIn, setIsLoggedIn] = useState();
  const { loading, error, data } = useQuery(MY_DATA);

  const itemReset = (value) => {
    setItem(value);
    sessionStorage.setItem('item', JSON.stringify(value))
  }
  
  useEffect(() => {
    if (data?.me?.u_id) {
      setIsLoggedIn(data?.me);
      /* setIsLoggedIn(true); */
    }  
  }, [data]);
 
  return (
    <AppContext.Provider
      value={{
        isToggledObj: [isToggled, setIsToggled],
        isMenuOpenObj: [isMenuOpen, setIsMenuOpen],
        isLoggedInObj: [isLoggedIn, setIsLoggedIn],
        itemObj: [item, itemReset],
        createItemObj: [createItem, setCreateItem],
        deleteItemObj: [deleteItem, setDeleteItem],
        comandaObj: [comanda, setComanda],
        userObj: [user, setUser],
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
