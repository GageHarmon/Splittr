import React, { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/splittr')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
console.log(data)
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}





