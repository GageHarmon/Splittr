import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface HomeProps {
  loggedIn: boolean;
}
// pass into home for loggedIN { loggedIn }: HomeProps

export default function Home({ loggedIn }: HomeProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };
    console.log(data)
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const user = await response.json();
      router.push('/home');
    } else {
      alert('Invalid username or password');
    }
  }

  useEffect(() => {
    if (loggedIn) {
      router.push('/home');
    }
  }, [loggedIn]);

  if (loggedIn) {
    return <div>Redirecting...</div>;
  } else {
    
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const loggedIn = req.cookies.user_id ? true : false;

  return {
    props: {
      loggedIn,
    },
  };
};