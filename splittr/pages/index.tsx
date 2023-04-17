import Head from 'next/head'
import Image from 'next/image'
import Login from './Login'
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
      primary: {
          main: "#FFBE79"
      },
      secondary: {
          main: "#89C4E1"
      }
  },
});

export async function getServerSideProps() {
  const res = await fetch('http://127.0.0.1:5000/bills')
  const text = await res.text();
  console.log('Response:', text);
  const bills = JSON.parse(text);

  return {
    props: {
      bills
    },
  }
}


export default function App({ bills }) {
  return (
    <ThemeProvider theme={theme}>
    <>
      <Head>
        <title>Splittr App</title>
      </Head>
      <main>
        <div>
          <Button color="primary" >Login</Button>
          <Image style={{ borderRadius: '4vh' }}
            src="/logo.png"
            alt="Splittr Logo"
            width={100}
            height={100}
          />
<<<<<<< HEAD
          <Home bills={bills} />
=======
          <Login />
>>>>>>> main
        </div>
      </main>
    </>
    </ThemeProvider>
  )
}
