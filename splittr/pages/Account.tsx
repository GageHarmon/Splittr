import React, { useState, useEffect } from 'react';

export default function User({ users }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(users);
  }, [users]);

  console.log(user);

  return (
    <div>
      <h1>Hello, User!</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}