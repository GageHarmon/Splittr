import React, { useState, useEffect } from 'react';

export default function Group({ users }) {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    setGroup(users);
  }, [users]);

  console.log(group);

  return (
    <div>
      <h1>Hello, group!</h1>
      <p>{JSON.stringify(group)}</p>
    </div>
  );
}
