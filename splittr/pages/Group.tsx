import React, { useState, useEffect } from 'react';

export default function Group({ bills, users, currUser }) {
  const [groups, setGroups] = useState([]);
  console.log(bills)
  console.log(currUser)
  if (!currUser || bills.length === 0) {
    return <div>Loading.. </div>;
  }
  const filteredGroups = currUser.bill_users.map(bill => {
    return bills.filter(singlebill => singlebill.id === bill.bill_id)[0]
  }

  )

  return (
    <div className="user-activity">
      <h2>{currUser.username}'s Groups:</h2>
      <div>
        <p>
          {currUser.username} has {filteredGroups.length} Groups.
        </p>
        <ul>
          {filteredGroups.map(bill => (
            <li key={bill.id}>
              <div>
                <p>Bill Amount: {bill.total_amount}</p>
                {bill.bill_users.map(user => (
                  <li key={user.id}>
                    <div>
                      <p>Username: {user.user.username} </p>
                    </div>
                  </li>
                ))
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
