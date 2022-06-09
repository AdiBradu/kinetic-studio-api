import { useMutation } from '@apollo/client';
import { useState, useContext } from 'react';
import { AppContext } from '../AppContext.js';

import {
  DELETE_AREA,
  DELETE_M_TYPE,
  DELETE_SERVICE,
  DELETE_PARTNER,
  DELETE_ORDER,
  DELETE_USER,
} from '../graphql/mutations';

import {
  GET_ALL_AREAS,
  GET_ALL_M_TYPES,
  GET_ALL_ORDERS,
  GET_ALL_PARTNERS,
  GET_ALL_SERVICES,
  GET_ALL_USERS,
} from '../graphql/queries.js';

const useTableViewAndDelete = (navlink) => {
  const { itemObj } = useContext(AppContext);
  const [empty, setEmpty] = useState(false);
  const [item, itemReset] = itemObj;

  const [deleteArea, deleteAreaObj] = useMutation(DELETE_AREA);
  const [deleteMType, deleteMTypeObj] = useMutation(DELETE_M_TYPE);
  const [deleteService, deleteServiceObj] = useMutation(DELETE_SERVICE);
  const [deletePartner, deletePartnerObj] = useMutation(DELETE_PARTNER);
  const [deleteOrder, deleteOrderObj] = useMutation(DELETE_ORDER);
  const [deleteUser, deleteUserObj] = useMutation(DELETE_USER);

  const handleView = (e) => {
    console.log(e);
    itemReset(e);
  };

  const handleDelete = async (e) => {
    /* console.log("Delete item", e, "from", navlink); */
    switch (navlink) {
      case 'specializari':
        await deleteMType({
          variables: { id: parseFloat(e.id) },
          refetchQueries: [{ query: GET_ALL_M_TYPES }],
        });
        break;
      case 'zone':
        await deleteArea({
          variables: { id: parseFloat(e.id) },
          refetchQueries: [{ query: GET_ALL_AREAS }],
        });
        break;
      case 'servicii':
        await deleteService({
          variables: { id: parseFloat(e.id) },
          refetchQueries: [{ query: GET_ALL_SERVICES }],
        });
        break;
      case 'terapeuti':
        await deletePartner({
          variables: { id: parseFloat(e.id) },
          refetchQueries: [{ query: GET_ALL_PARTNERS }],
        });
        break;
      case 'comenzi':
        await deleteOrder({
          variables: { id: parseFloat(e.id) },
          refetchQueries: [
            { query: GET_ALL_ORDERS, variables: { offset: 0, limit: 50 } },
          ],
        });
        break;
      case 'admin':
        await deleteUser({
          variables: { id: parseFloat(e.id) },
          refetchQueries: [{ query: GET_ALL_USERS }],
        });
        break;

      default:
        break;
    }
  };

  return { handleView, handleDelete, empty };
};

export default useTableViewAndDelete;
