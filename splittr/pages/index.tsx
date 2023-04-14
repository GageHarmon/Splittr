import Head from 'next/head'
import Image from 'next/image'
import Home from './Home'

export default function App() {
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
          <Home />
        </div>
      </main>
    </>
  )
}
