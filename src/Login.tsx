import React, { useState } from 'react';
import { api } from './api';
import { useDispatch } from 'react-redux';
import { setAuth } from './store/authSlice';

const Login = () => {
  const [loginCreds, setLoginCreds] = useState<{
    email: string;
    password: string;
  }>({
    email: 'ashKetchum@pokemon.com',
    password: 'GottaCatchEmAll',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch();

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation block
    if (!loginCreds.email.length || !loginCreds.password.length) {
      setErrorMessage('Please enter valid credentials.');
      return;
    }

    setErrorMessage('');

    console.log({ ...loginCreds });

    try {
      const data = await api.post('/auth/login', loginCreds);
      const loginData = data?.data?.data?.data;
      dispatch(setAuth(loginData));
    } catch (err) {
      console.log(err);
      setErrorMessage('Error occured while logging.');
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={loginUser}>
        <div
          style={{
            border: '1px solid slate',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <h2>Login</h2>
          <label htmlFor="Email">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={loginCreds.email}
              style={{ fontSize: '1.75rem' }}
              onChange={(e) =>
                setLoginCreds((prev) => ({ ...prev, email: e.target.value }))
              }
            ></input>
          </label>
          <label htmlFor="Password">
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={loginCreds.password}
              onChange={(e) =>
                setLoginCreds((prev) => ({ ...prev, password: e.target.value }))
              }
              style={{ fontSize: '1.75rem' }}
            ></input>
          </label>
          <button type="submit">Login</button>
          <p style={{ color: 'red', display: errorMessage ? 'block' : 'none' }}>
            {errorMessage}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
