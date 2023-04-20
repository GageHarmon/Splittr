import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function Group({ bills, users, currUser }) {
  const [value, setValue] = useState('activity');
  const [groups, setGroups] = useState([]);

  if (!currUser || bills.length === 0) {
    return <div>Loading.. </div>;
  }

  const filteredGroups = currUser.bill_users.map(bill => {
    return bills.filter(singlebill => singlebill.id === bill.bill_id)[0]
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <div className="user-activity">
          <h2 className="text-3xl font-bold text-dblue">{currUser.username}'s Groups:</h2>
          <div>
            <p className="text-lg font-bold mb-2">
              {currUser.username} has {filteredGroups.length} Groups.
            </p>
            <ul>
              {filteredGroups.map(bill => (
                <li key={bill.id} className="bg-gray-100 rounded-md shadow-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">{bill.title}</h3>
                    <p className="font-bold text-lg">Entire Bill:
                      ${bill.total_amount}.00</p>
                  </div>
                  <ul>
                    {bill.bill_users.map(user => (
                      <li key={user.id} className="mb-2">
                        <p>Username: {user.user.username} </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <Footer activeLink={value} onChange={setValue} />
        </div>
      </div>
    </div>
  );
}
