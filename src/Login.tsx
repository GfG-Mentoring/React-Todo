import React, { useContext, useState } from 'react';
import { api } from './api';
import { AuthContext } from './providers/AuthContent';

const Login = () => {
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  const [loginCreds, setLoginCreds] = useState<{
    email: string;
    password: string;
  }>({
    email: 'shikhar@gmail.com',
    password: 'banaman',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // make the api call to login user
    try {
      const response = await api.post('/login', {
        email: loginCreds.email,
        password: loginCreds.password,
      });

      if (response.data.data.accessToken) {
        localStorage.setItem('auth', JSON.stringify(response.data.data));
        setAuthInfo({ ...response.data.data, isLoggedIn: true });
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err?.response?.data?.message);
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
