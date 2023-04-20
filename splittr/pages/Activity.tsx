// import React, { useState, useEffect } from 'react';

// export default function Activity({ bills }) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(bills);
//   }, [bills]);

//   console.log(data);

//   return (
//     <div>
//       <h1>Hello, activity!</h1>
//       <p>{JSON.stringify(data)}</p>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function Activity({ bills }) {
  const [value, setValue] = useState('activity');
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(bills);
  }, [bills]);

  console.log(data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-dblue">Hello, activity!</h1>
      </div>
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
