import React, { useState, useEffect } from 'react';

export default function Home({ bills }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(bills);
  }, [bills]);

  console.log(data);

  return (
    <div>
      <h1>Welcome Home Nerds</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}