import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_EMAILS } from "../../../graphql/queries";
import { processEmails } from "../../../utils";
import BigSaveButton from "../../Defaults/Buttons/BigSaveButton/BigSaveButton.component";
import TinyEditorComponent from "../TinyEditor/Editor.component";
import { HANDLE_EMAILS } from "../../../graphql/mutations";
import Input from "../../Defaults/Input/Input.component.jsx";

export default function Emails() {  
  const [emails, setSEmails] = useState({id1: parseFloat(0), id2: parseFloat(0), subiect1: "", emailBody1: "", subiect2: "", emailBody2: ""}); 
  const emailsQObj = useQuery(GET_ALL_EMAILS);
  const queryData = emailsQObj?.data ? emailsQObj.data['getAllEmails'] : [];
  const [handleEmails, handleEmailsObj] = useMutation(HANDLE_EMAILS);
 

  useEffect(() => {   
    if(queryData) {  
      const processedEmails  = processEmails(queryData);    
      setSEmails(processedEmails);
    }
  }, [queryData])

  const handleEdit = async () => {     
    let mails = [{id: parseFloat(emails.id1), email_subject: emails.subiect1, email_body: emails.emailBody1}, {id: parseFloat(emails.id2), email_subject: emails.subiect2, email_body: emails.emailBody2}];
    await handleEmails({variables: {emails: mails}, refetchQueries: [ { query: GET_ALL_EMAILS }]});
  };

  const handleChange = (e) => {
    const value = e.target.value;  
    if(e.target.name === 'subiect mail confirmare comanda') {
      setSEmails({...emails, subiect1: value});
    } else if (e.target.name === 'subiect mail confirmare plata') {      
      setSEmails({...emails, subiect2: value});
    }    
  };
  const handleFirstEditor = (data) => {
    let newE = emails;
    newE.emailBody1 = data;    
    setSEmails(newE);
  }
  const handleSecondEditor = (data) => {   
    let newE = emails;
    newE.emailBody2 = data;
    setSEmails(newE);
  }  
  return (
      <div>        
        <Input
          value={emails.subiect1}
          handleChange={handleChange}     
          label={"subiect mail confirmare comanda"}
          type={"text"}
          placeholder={"subiect mail confirmare comanda"}
        />
        <TinyEditorComponent 
          initialValue={emails.emailBody1}
          changeHandler={handleFirstEditor}
        />
        <div>
          <br></br>
          <br></br>
        </div>
        <Input
          value={emails.subiect2}
          handleChange={handleChange}        
          label={"subiect mail confirmare plata"}
          type={"text"}
          placeholder={"subiect mail confirmare plata"}
        />
        <TinyEditorComponent 
           initialValue={emails.emailBody2}
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