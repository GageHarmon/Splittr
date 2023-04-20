import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function Group({ bills, users, currUser }) {
  const [value, setValue] = useState('activity');
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
  <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <div className="user-activity">
          <h2 className="text-3xl font-bold text-dblue">{currUser.username}'s Groups:</h2>
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
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
