import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Splittr App</title>
      </Head>
      <main>
        <div>
          <Image style={{borderRadius: '4vh'}}
            src="/splittr.png"
            alt="Splittr Logo"
            width= {200}
            height= {150}
          />
        </div>
      </main>
    </>
  )
}
