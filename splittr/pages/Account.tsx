// import { useState } from 'react';
// // import Account from '/Account';

// export default function UserActivity({ bills, currUser }) {
//   const [userBills, setUserBills] = useState([]);

//   if (!currUser) {
//     return <div>Loading.. </div>;
//   }
//   const filteredBills = bills.filter(bill => {
//     return currUser.bill_users.some(billUser => billUser.bill_id === bill.id);
//   });

//   return (
//     <div className="user-activity">
//       <h2>{currUser.username}'s Bills:</h2>
//       <div>
//         <p>Hello World!</p>
//         <p>
//           {currUser.username} has {filteredBills.length} bills.
//         </p>
//         <ul>
//           {filteredBills.map(bill => (
//             <li key={bill.id}>
//               <div>
//                 <p>Bill Total: {bill.total_amount}</p>
//                 <ul>
//                   {bill.bill_items.map(item => (
//                     <li key={item.id}>
//                       <div>
//                         <p>Title: {item.item.title} </p>
//                         <p>Description: {item.item.description}</p>
//                         <p>Price: {item.item.price}</p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-dblue">{currUser.username}'s Bills</h2>
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
                <p className="font-bold text-dblue">Bill Total: {bill.total_amount}</p>
                <ul>
                  {bill.bill_items.map(item => (
                    <li key={item.id} className="mt-2">
                      <div>
                        <p className="text-dblue">Title: {item.item.title} </p>
                        <p className="text-dblue">Description: {item.item.description}</p>
                        <p className="text-dblue">Price: {item.item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}