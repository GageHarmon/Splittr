import React from 'react';

export default function BillItems({ bills, currUser }) {
  if (!currUser) {
    return <div>Loading.. </div>;
  }

  const filteredBills = bills.filter(bill => {
    return currUser.bill_users.some(billUser => billUser.bill_id === bill.id);
  });

  return (
    <div>
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
    </div>
  );
}
