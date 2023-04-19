import '@/styles/globals.css'
import {useEffect, useState} from 'react'

export default function App({ Component, pageProps }) {
  const [currUser, setcurrUser] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);
  
  useEffect(()=>{
    fetch('/check')
    .then(r => r.json())
    .then(data => setloggedIn(data.logged_in))
  },[]);


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
          setcurrUser(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching logged_user:", error);
      });
  }, []);
  

  return <Component {...pageProps} currUser={currUser} loggedIn={loggedIn}/>
}