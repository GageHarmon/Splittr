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
    <>
      <Head>
        <title>Splittr App</title>
      </Head>
      <main>
        <div>
          <Image style={{ borderRadius: '4vh' }}
            src="/logo.png"
            alt="Splittr Logo"
            width={100}
            height={100}
          />
          <Home bills={bills} />

        </div>
      </main>
    </>
  )
}
