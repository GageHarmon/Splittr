// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     const { username, password } = req.body;

//     try {
//       // Replace this URL with the URL of your Python backend login route
//       const backendUrl = 'http://localhost:5000/login';

//       const response = await fetch(backendUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         const user = await response.json();
//         res.setHeader('Set-Cookie', `user_id=${user.id}; path=/; HttpOnly`);
//         res.status(200).json(user);
//       } else {
//         res.status(401).json({ message: 'Invalid username or password' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'An error occurred' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
