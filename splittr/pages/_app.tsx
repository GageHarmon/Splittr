import '@/styles/globals.css';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const [currUser, setCurrUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [bills, setBills] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/check')
      .then((r) => r.json())
      .then((data) => setLoggedIn(data.logged_in));
  }, []);

  useEffect(() => {
    fetch('/users')
      .then((r) => {
        if (!r.ok) {
          throw new Error(`HTTP error ${r.status}`);
        }
        return r.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);


  useEffect(() => {
    fetch('/logged_user')
      .then((r) => {
        if (!r.ok) {
          throw new Error(`HTTP error ${r.status}`);
        }
        return r.json();
      })
      .then((data) => {
        if (!data.error) {
          setCurrUser(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching logged_user:', error);
      });
  }, []);

  useEffect(() => {
    fetch('/bills')
      .then((r) => {
        if (!r.ok) {
          throw new Error(`HTTP error ${r.status}`);
        }
        return r.json();
      })
      .then((data) => {
        setBills(data);
      })
      .catch((error) => {
        console.error('Error fetching bills:', error);
      });
  }, []);


  return (
    <Component {...pageProps} currUser={currUser} loggedIn={loggedIn} bills={bills} users={users} />
  );
}
