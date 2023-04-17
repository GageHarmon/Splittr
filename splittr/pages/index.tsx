import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { setCookie } from 'nookies';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      const data = response.data;
      if (data.status === 'success') {
        // Store the user in cookies
        setCookie(null, 'user', JSON.stringify(data.user), {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
        // Redirect to app page
        router.push('/app');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const user = cookies.user ? JSON.parse(cookies.user) : null;
  if (user) {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Login;