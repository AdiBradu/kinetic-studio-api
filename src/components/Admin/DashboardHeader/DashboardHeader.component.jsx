import React, { useContext } from "react";
import "./DashboardHeader.component.scss";
import { AppContext } from "../../../AppContext.js";
import { Link } from "react-router-dom";
import ButtonAdd from "../../Defaults/Buttons/Add/ButtonAdd.component.jsx";
import ButtonSave from "../../Defaults/Buttons/Save/ButtonSave.component.jsx";
import { useMatch } from "react-router";
import { useMutation } from "@apollo/client";
import { CREATE_AREA, CREATE_M_TYPE, CREATE_SERVICE, CREATE_PARTNER, CREATE_ORDER, CREATE_USER } from "../../../graphql/mutations";
import { GET_ALL_AREAS, GET_ALL_M_TYPES, GET_ALL_ORDERS, GET_ALL_PARTNERS, GET_ALL_SERVICES, GET_ALL_USERS } from "../../../graphql/queries";

export default function DashboardHeader({ state, item }) {
  const { isDesktop, createItemObj } = useContext(AppContext);
  const [createItem, setCreateItem] = createItemObj;
  const matchDashboard = useMatch("/dashboard");
  const matchAdd = useMatch("/dashboard/:id/adauga");
  const matchItem = useMatch("/dashboard/:id/:id");

  const [createArea, createAreaObj] = useMutation(CREATE_AREA);
  const [createMType, createMTypeObj] = useMutation(CREATE_M_TYPE);  
  const [createService, createServiceObj] = useMutation(CREATE_SERVICE);  
  const [createPartner, createPartnerObj] = useMutation(CREATE_PARTNER);  
  const [createOrder, createOrderObj] = useMutation(CREATE_ORDER);  
  const [createUser, createUserObj] = useMutation(CREATE_USER);  

  const handleSave = async () => {
    /* console.log("Create item", createItem, "to", state); */
    switch (state) {
      case "zone":          
          await createArea({variables: {name: createItem.denumire, extra_charge: parseFloat(createItem.tarif)}, refetchQueries: [ { query: GET_ALL_AREAS }]});          
        break;
      case "specializari":          
          await createMType({variables: {name: createItem.denumire}, refetchQueries: [ { query: GET_ALL_M_TYPES }]});
        break;
      case "servicii":          
          await createService({variables: {service_name: createItem.denumire, type: parseFloat(createItem.specializare), appointments_number: parseInt(createItem.sedinte), appointment_duration: parseInt(createItem.durata), service_cost: parseFloat(createItem.tarif)}, refetchQueries: [ { query: GET_ALL_SERVICES }]});
      break;  
      case "terapeuti":          
          await createPartner({variables: {firstName: createItem.prenume, lastName: createItem.nume, phone: createItem.telefon, email: createItem.email, profilePictureUrl: createItem.profile_picture_url, description: createItem.descriere, mTypes: createItem.specializari}, refetchQueries: [ { query: GET_ALL_PARTNERS }]});
      break;  
      case "comenzi":          
          let dets = [];
          if(createItem.programari.length) {
            createItem.programari.forEach((el) => {
              const objSched = {
                partner_id: parseFloat(el.terapeut),
                appointment_start: parseFloat(el.timeSlotStart),
                appointment_end: parseFloat(el.timeSlotEnd),
                appointment_order: parseInt(el.sedinta),
              };
              dets.push(objSched);
            });
          }
          await createOrder({variables: {firstName: createItem.prenume, lastName: createItem.nume, phone: createItem.telefon, email: createItem.email, region: createItem.judet, city: createItem.localitate, street: createItem.strada, streetNumber: createItem.nr, serviceId: parseFloat(createItem.serviciu) , details: dets}, refetchQueries: [ { query: GET_ALL_ORDERS, variables: {offset: 0, limit: 50} }]});
      break; 
      case "admin":          
          await createUser({variables: {firstName: createItem.prenume, lastName: createItem.nume, email: createItem.email, phone: createItem.telefon, newPassword: createItem.parola, confirmPassword: createItem.confirma}, refetchQueries: [ { query: GET_ALL_USERS }]});
      break;
  
      default:
        break;
    }
    setCreateItem({});
  };

  return (

      <div className="dashboard-header padding">
        <h3>{state}</h3>
        {matchAdd ? (
          <Link 
            to={`/dashboard/${state}`} 
            onClick={() => handleSave()}
            state={state}>
            <ButtonSave />
          </Link>
        
        ) : matchItem ? (
          state !== "admin" ? (
          <Link to={`/dashboard/${state}/adauga`} state={state}>
            {state !== "programare" && <ButtonAdd />}
          </Link>
          ) 
          :
          ""
        ) : matchDashboard ? (
          ""
        ) :  ( state !== "emails"  && (
          <Link to={`/dashboard/${state}/adauga`} state={state}>
            {state !== "programare" && <ButtonAdd />}
          </Link>
          )
        )}
      </div>

  );
}
