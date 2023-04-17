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

export default function App() {
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
          <Login />
        </div>
      </main>
    </>
    </ThemeProvider>
  )
}
