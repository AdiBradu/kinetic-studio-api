import React, { useState, useContext, useEffect, Suspense } from 'react';
import './Login.component.scss';
import Input from '../Input/Input.component';
import ButtonLogin from '../Buttons/Login/ButtonLogin.component';
import { AppContext } from '../../../AppContext';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { setDashboardHeight, resizeRadar } from '../../../utils.js';
import Spinner from '../Spinner/Spinner.component';

export default function Login() {
  const { isLoggedInObj } = useContext(AppContext);
  const setIsLoggedIn = isLoggedInObj[1];
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginUsr, loginUsrObj] = useMutation(LOGIN);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  };

  const handleLogin = async () => {
    let asd = await loginUsr({
      variables: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    return asd;
  };

  useEffect(() => {
    setDashboardHeight();
    resizeRadar(setDashboardHeight);
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      {loginUsrObj.loading ? (
        <Spinner />
      ) : (
        <div className="login" id="login">
          <Input
            value={credentials.email}
            handleChange={handleChange}
            name="email"
            label={'email'}
            type={'email'}
            placeholder={'email'}
          />
          <Input
            value={credentials.password}
            handleChange={handleChange}
            name="password"
            label={'password'}
            type={'password'}
            placeholder={'password'}
          />
          <Link
            to={`/dashboard`}
            onClick={async (e) => {
              e.preventDefault();
              let zzz = await loginUsr({
                variables: {
                  email: credentials.email,
                  password: credentials.password,
                },
              });
              setIsLoggedIn(zzz?.data?.login ? zzz?.data?.login : false);
              navigate('/dashboard');
            }}
          >
            <ButtonLogin />
          </Link>
        </div>
      )}
    </Suspense>
  );
}
