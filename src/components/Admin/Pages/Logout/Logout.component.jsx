import { useApolloClient, useMutation } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../../../AppContext";
import { LOGOUT } from "../../../../graphql/mutations";

export default function Logout() {
  const { isLoggedInObj } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = isLoggedInObj;
  let navigate = useNavigate();
  const client = useApolloClient();
  const [logoutUsr, logoutUsrObj] = useMutation(LOGOUT);
  
  if(isLoggedIn) {
    sessionStorage.removeItem('item');
    setIsLoggedIn(false);
    logoutUsr();
    client.clearStore();
  }  
  return  navigate('/dashboard');
}  