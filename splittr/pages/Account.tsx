import { useState } from 'react';
// import Account from '/Account';
// import './styles.css';

export default function UserActivity({ bills, currUser }) {
  const [userBills, setUserBills] = useState([]);
  // console.log(currUser.bill_users)

  if (!currUser) {
    return <div>Loading.. </div>;
  }
  const filteredBills = bills.filter(bill => {
    return currUser.bill_users.some(billUser => billUser.bill_id === bill.id);
  });

  console.log(filteredBills);

  return (
    <div className="user-activity">
      <h2>{currUser.username}'s Bills:</h2>
      <div>
        <p>Hello World!</p>
        <p>
          {currUser.username} has {filteredBills.length} bills.
        </p>
        <ul>
          {filteredBills.map(bill => (
            <li key={bill.id}>
              <div>
                <p>Bill Total: {bill.total_amount}</p>
                <ul>
                  {bill.bill_items.map(item => (
                    <li key={item.id}>
                      <div>
                        <p>Title: {item.item.title} </p>
                        <p>Description: {item.item.description}</p>
                        <p>Price: {item.item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
