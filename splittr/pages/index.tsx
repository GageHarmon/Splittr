import Head from 'next/head'
import Image from 'next/image'
import Home from './Home'

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
