import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';

interface HomeProps {
  loggedIn: boolean;
}

export default function Home({ loggedIn }: HomeProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const theme = useTheme();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };
    console.log(data)
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const user = await response.json();
      router.push('/Home');
    } else {
      alert('Invalid username or password');
    }
  }

  useEffect(() => {
    if (loggedIn) {
      router.push('/Home');
    }
  }, [loggedIn]);

  if (loggedIn) {
    return <div>Redirecting...</div>;
  } else {
    
//     return (
//       <div className='min-h-screen bg-gradient-to-br from-rblue to-rorange flex items-center justify-center'>
//         <div className='bg-white p-10 rounded-lg shadow-md'>
//           <h2 className='text-3xl font-bold text-dblue mb-8'>Log in</h2>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <div>
//                   <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Username"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                   />
//                 </div>
//                 <button className='bg-rorange rounded w-20' type="submit" >Login</button>
//               </div>
//             </form>
//         </div>
//       </div>
//     );
//   }
// }
return (
  <div className='min-h-screen bg-gradient-to-br from-rblue to-rorange flex items-center justify-center'>
        <div className='bg-white p-10 rounded-lg shadow-md'>
            <h2 className='text-3xl font-bold text-dblue mb-8'>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-dblue font-bold mb-2' htmlFor='email'>
                        Username:
                    </label>
                    <input
                    className='border rounded w-full py-1 px-3 text-gray-700 leading-tight'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-dblue font-bold mb-2' htmlFor='password'>
                        Password:
                    </label>
                    <input
                        className='border rounded w-full py-1 px-3 text-gray-700 leading-tight'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <input
                    className='bg-dorange text-dblue font-bold py-1 px-4 rounded cursor-pointer'
                    id='submit-btn'
                    type='submit'
                    value='Enter'
                />
            </form>
        </div>
    </div>
);
}
}