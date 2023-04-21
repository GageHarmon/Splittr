import { useState } from 'react';
import Footer from '../components/Footer';

export default function UserActivity({ bills, currUser }) {
  const [value, setValue] = useState('activity');
  const [userBills, setUserBills] = useState([]);

  if (!currUser) {
    return <div className="text-dblue">Loading.. </div>;
  }
  const filteredBills = bills.filter(bill => {
    return currUser.bill_users.some(billUser => billUser.bill_id === bill.id);
  });

  const handlePay = (billId) => {
    // Implement your pay functionality here
    console.log(`Paid bill ${billId}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-gradient-to-br from-rorange to-rblue p-6 mb-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-dblue">{currUser.username}'s Account</h2>
      </div>

      {/* +++++ USER BILL INFO SECTION +++++ */}
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl w-full max-w-screen-md mt-20">
        <p className="text-dblue font-bold">
          {currUser.username} has {filteredBills.length} bills.
        </p>
        <ul>
          {filteredBills.map(bill => (
            <li key={bill.id} className="mb-4">
              <div className="bg-white p-4 rounded-lg shadow-2xl">
                <p className="font-bold text-dblue">Bill Total: ${bill.total_amount}.00</p>
                <ul>
                  {bill.bill_items.map(item => (
                    <li key={item.id} className="mt-2">
                      <div>
                        <p>
                        <span className="text-dblue font-bold">Name:</span> <span className="text-dblue">{item.item.title}</span>
                        </p>
                        <p>
                          <span className="text-dblue font-bold">Description:</span> <span className="text-dblue">{item.item.description}</span>
                        </p>
                        <p>
                        <span className="text-dblue font-bold">Price:</span> <span className="text-dblue">${item.item.price}.00 </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="bg-rorange text-dblue font-bold py-1 px-4 rounded mt-4" onClick={() => handlePay(bill.id)}>Pay</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
