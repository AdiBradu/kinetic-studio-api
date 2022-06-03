import { useMutation } from "@apollo/client";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext.js";
import { DELETE_AREA, DELETE_M_TYPE, DELETE_SERVICE, DELETE_PARTNER, DELETE_ORDER } from "../graphql/mutations";
import { GET_ALL_AREAS, GET_ALL_M_TYPES, GET_ALL_ORDERS, GET_ALL_PARTNERS, GET_ALL_SERVICES } from "../graphql/queries.js";
const useTableViewAndDelete = (navlink) => {

  const { itemObj } = useContext(AppContext);
  const [empty, setEmpty] = useState(false);
  const [item, itemReset] = itemObj;

  const [deleteArea, deleteAreaObj] = useMutation(DELETE_AREA);
  const [deleteMType, deleteMTypeObj] = useMutation(DELETE_M_TYPE);
  const [deleteService, deleteServiceObj] = useMutation(DELETE_SERVICE);
  const [deletePartner, deletePartnerObj] = useMutation(DELETE_PARTNER);
  const [deleteOrder, deleteOrderObj] = useMutation(DELETE_ORDER);

  const handleView = (e) => {
    itemReset(e);
  };

  const handleDelete = async (e) => {
    /* console.log("Delete item", e, "from", navlink); */
    switch (navlink) {
      case "specializari":          
          await deleteMType({variables: {id: parseFloat(e.id)}, refetchQueries: [ { query: GET_ALL_M_TYPES }]});          
        break;
      case "zone":          
          await deleteArea({variables: {id: parseFloat(e.id)}, refetchQueries: [ { query: GET_ALL_AREAS }]}); 
        break;
      case "servicii":          
          await deleteService({variables: {id: parseFloat(e.id)}, refetchQueries: [ { query: GET_ALL_SERVICES }]}); 
      break;  
      case "terapeuti":          
          await deletePartner({variables: {id: parseFloat(e.id)}, refetchQueries: [ { query: GET_ALL_PARTNERS }]}); 
      break;  
      case "comenzi":          
          await deleteOrder({variables: {id: parseFloat(e.id)}, refetchQueries: [ { query: GET_ALL_ORDERS }]}); 
      break; 
  
      default:
        break;
    }
  };

  return { handleView, handleDelete, empty };
};

export default useTableViewAndDelete;
