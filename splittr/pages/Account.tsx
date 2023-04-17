import React, { useState, useEffect } from 'react';

export default function User({ users, userId, bills }) {
  const [user, setUser] = useState({});
  const [userBills, setUserBills] = useState([]);

  useEffect(() => {
    if (users) {
      setUser(users.find(u => u.id === userId) || {});
    }
  }, [users, userId]);


  useEffect(() => {
    if (user && bills) {
      const userBills = bills.filter(bill => bill.user_id === userId);
      setUserBills(userBills);
    }
  }, [bills, user, userId]);



  return (
    <div>
      <h1>Hello, {user.username}!</h1>
      <h2>{user.username}'s Bills:</h2>
      <ul>
        {userBills.map(bill => (
          <li key={bill.id}>{bill.description}: {bill.amount}</li>
        ))}
      </ul>
    </div>
  );
}
