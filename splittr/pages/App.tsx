import Head from 'next/head'
import Image from 'next/image'
import Activity from './Activity'
import Group from './Group'
import User from './Account'
import Link from 'next/link'

export async function getServerSideProps() {
  const billsRes = await fetch('http://127.0.0.1:5000/bills')
  const billsText = await billsRes.text();
  console.log('Bills Response:', billsText);
  const bills = JSON.parse(billsText);

  const usersRes = await fetch('http://127.0.0.1:5000/users')
  const usersText = await usersRes.text();
  console.log('Users Response:', usersText);
  const users = JSON.parse(usersText);

  return {
    props: {
      bills,
      users
    },
  }
}

export default function App({ bills, users }) {
  return (
    <>
      <Head>
        <title>Splittr App</title>
      </Head>
      <nav>
        <ul>
          <li>
            <Link href="/home">
              Home
            </Link>
          </li>
          <li>
            <Link href="/activity">
              Activity
            </Link>
          </li>
          <li>
            <Link href="/group">
              Group
            </Link>
          </li>
          <li>
            <Link href="/user">
              Account
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <div>
          <Image style={{ borderRadius: '4vh' }}
            src="/logo.png"
            alt="Splittr Logo"
            width={100}
            height={100}
          />
          <Activity bills={bills} />
          <Group users={users} />
          <User users={users} bills={bills} userId={users} />
        </div>
      </main>
    </>
  )
}

