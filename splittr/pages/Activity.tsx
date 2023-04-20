import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function BillItems({ bills, currUser }) {
  if (!currUser) {
    return <div>Loading.. </div>;
  }

  const [value, setValue] = useState('activity');
  const filteredBills = bills.filter(bill => {
    return currUser.bill_users.some(billUser => billUser.bill_id === bill.id);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <h2>Items for {currUser.username}</h2>
        {filteredBills.map(bill => (
          <div key={bill.id}>
            <h3>{bill.title}</h3>
            {bill.bill_items.map(item => (
              <div key={item.id}>
                <p>Item status: {item.item.status}</p>
                <p>Item Title: {item.item.title}</p>
                <p>Item Description: {item.item.description}</p>
                <p>Item Amount: {item.item.price}</p>
                <p>Paid: {item.item.updated_at}</p>
              </div>
            ))}
          </div>
        ))}
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
