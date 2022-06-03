import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_EMAILS } from "../../../graphql/queries";
import { processEmails } from "../../../utils";
import InputEmails from "../../Defaults/Input/InputEmails/InputEmails.component";
import BigSaveButton from "../../Defaults/Buttons/BigSaveButton/BigSaveButton.component";
import TinyEditorComponent from "../TinyEditor/Editor.component";
import { HANDLE_EMAILS } from "../../../graphql/mutations";


export default function Emails() {  
  const [emails, setEmails] = useState([{id: parseFloat(0), subiect: "", emailBody: ""}, {id: parseFloat(0), subiect: "", emailBody: ""}]);
    
  const emailsQObj = useQuery(GET_ALL_EMAILS);
  const queryData = emailsQObj?.data ? emailsQObj.data['getAllEmails'] : [];
  const [handleEmails, handleEmailsObj] = useMutation(HANDLE_EMAILS);

  useEffect(() => {   
    if(queryData) {
      const processedEmails  = processEmails(queryData);    
      if(processedEmails.length > 0){
        setEmails(processedEmails);
      } 
    }
   
    
  }, [queryData])

  const handleEdit = async () => {     
    let mails = [];
    emails.forEach((el) => {
      const objMail = {
        id: parseFloat(el.id),
        email_subject: el.subiect,
        email_body: el.emailBody,
      };
      mails.push(objMail);
    });
     
    await handleEmails({variables: {emails: mails}, refetchQueries: [ { query: GET_ALL_EMAILS }]});
  };

  const handleChange = (e) => {
    const value = e.target.value;
    let newEmails = emails;
    if(e.target.name === 'sub1') {
      newEmails[0].subiect = value;
    } else if (e.target.name === 'sub2') {
      newEmails[1].subiect = value;
    }    
    setEmails(newEmails);    
  };
  const handleFirstEditor = (data) => {
    let newEmails = emails;
    newEmails[0].emailBody = data;
    setEmails(newEmails);  
  }
  const handleSecondEditor = (data) => {
    let newEmails = emails;
    newEmails[1].emailBody = data;
    setEmails(newEmails);  
  }
  let subject1 = emails[0].subiect;
  let subject2 = emails[1].subiect;
  let emailBody1 = emails[0].emailBody;
  let emailBody2 = emails[1].emailBody;
  
  return (
      <div>        
        <InputEmails
          value={subject1}
          handleChange={handleChange}
          name={"sub1"}
          label={"subiect mail confirmare comanda"}
          type={"text"}
          placeholder={"subiect mail confirmare comanda"}
        />
        <TinyEditorComponent 
          initialValue={emailBody1}
          changeHandler={handleFirstEditor}
        />
        <div>
          <br></br>
          <br></br>
        </div>
        <InputEmails
          value={subject2}
          handleChange={handleChange}
          name={"sub2"}
          label={"subiect mail confirmare plata"}
          type={"text"}
          placeholder={"subiect mail confirmare plata"}
        />
        <TinyEditorComponent 
           initialValue={emailBody2}
           changeHandler={handleSecondEditor}
        />
        <div>
          <br></br>
          <br></br>
        </div>
        <BigSaveButton  
          onClick={handleEdit}
        />
      </div>    
  );
}