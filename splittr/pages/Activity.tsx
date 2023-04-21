import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function BillItems({ bills, currUser }) {
  if (!currUser) {
    return <div className="text-dblue">Loading.. </div>;
  }

  const [value, setValue] = useState('activity');
  const filteredBills = bills.filter(bill => {
    return currUser.bill_users.some(billUser => billUser.bill_id === bill.id);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-gradient-to-br from-rblue to-rorange p-4 mb-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-dblue">Items for {currUser.username}</h2>
      </div>
      {filteredBills.map(bill => (
        <div key={bill.id} className="bg-white p-6 mb-8 rounded-lg shadow-2xl w-full max-w-screen-md mt-20">
          <p className="text-dblue font-bold">{bill.title}</p>
          {bill.bill_items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-2xl mt-2">
              <p>
                <span className="text-dblue font-bold">Item Name:</span> <span className="text-dblue">{item.item.title}</span>
              </p>
              <p>
                <span className="text-dblue font-bold">Item Description:</span> <span className="text-dblue">{item.item.description}</span>
              </p>
              <p>
                <span className="text-dblue font-bold">Item Amount:</span> <span className="text-dblue">${item.item.price}.00</span>
              </p>
              <p>
                <span className="text-dblue font-bold">Item status:</span> <span className="text-dblue">{item.item.status}</span>
              </p>
              <p>
                <span className="text-dblue font-bold">Created:</span> <span className="text-dblue">{item.item.updated_at}</span>
              </p>
            </div>
          ))}
          </div>
        ))}
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
