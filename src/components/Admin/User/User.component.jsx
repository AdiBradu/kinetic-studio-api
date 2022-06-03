import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_USER } from "../../../graphql/queries";
import { processUser } from "../../../utils";
import SelectImage from "../../Defaults/SelectImage/SelectImage.component";
import Input from "../../Defaults/Input/Input.component";
import { UPDATE_USER } from "../../../graphql/mutations";
import ButtonContinue from "../../Defaults/Buttons/Continue/ButtonContinue.component";


export default function User({ item }) {  
  const [user, setUser] = useState({
    id: 0,
    nume: "",
    prenume: "",   
    telefon: "",    
    profile_picture_url: "",     
    email: "",
    parola: "",
    confirma: "",
  });

  const userQObj = useQuery(GET_USER, {variables: {id: item.id}});
  const queryData = userQObj?.data ? userQObj.data['getUser'] : [];
  const [updUsr, updUsrObj] = useMutation(UPDATE_USER);

  useEffect(() => {   
    if(queryData) {
      const processedUser  = processUser(queryData);    
      if(processedUser.length){
        setUser(processedUser[0]);
      } 
    }
  }, [queryData])

  const handleEdit = async () => {         
    await updUsr({variables: {id: parseFloat(user.id), firstName: user.prenume, lastName: user.nume, email: user.email, phone: user.telefon, profile_picture_url: user.profile_picture_url, newPassword: user.parola, confirmPassword: user.confirma}, refetchQueries: [ { query: GET_ALL_USERS }, {query: GET_USER, variables: {id: user.id}}]});
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });   
  };
  
  const photoUpload = (value) => {
    setUser({
      ...user,
      profile_picture_url: value,
    });
  }
  
  return (
    <>
    {user.id > 0 && (
    <div>
      <div>
        <SelectImage 
        id={"tat"}
        handleChange={photoUpload} 
        src={user.profile_picture_url}
        />
        <Input
          value={user.nume}
          handleChange={handleChange}
          name="nume"
          label={"nume"}
          type={"text"}
          placeholder={"nume"}
        />
        <Input
          value={user.prenume}
          handleChange={handleChange}
          name="prenume"
          label={"prenume"}
          type={"text"}
          placeholder={"prenume"}
        />
        <Input
          value={user.telefon}
          handleChange={handleChange}
          name="telefon"
          label={"telefon"}
          type={"text"}
          placeholder={"type"}
        />
        <Input
          value={user.email}
          handleChange={handleChange}
          name="email"
          label={"email"}
          type={"email"}
          placeholder={"email"}
        />
        <Input
          value={user.parola}
          handleChange={handleChange}
          name="password"
          label={"parola"}
          type={"password"}
          placeholder={"parola"}
        />
        <Input
          value={user.confirma}
          handleChange={handleChange}
          name="confirma"
          label={"confirma"}
          type={"password"}
          placeholder={"confirma parola"}
        />      
        <Link
        to={"/dashboard/admin"}
        state={"admin"}
        onClick={() => handleEdit()}
      >
          <ButtonContinue  />
        </Link>
      </div>
      
    </div>
    )}
    </>
  );
}