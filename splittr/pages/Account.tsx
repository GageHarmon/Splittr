import { useState } from 'react';
import Footer from '../components/Footer';

export default function UserActivity({ bills, currUser }) {
  const [value, setValue] = useState('activity');
  const [userBills, setUserBills] = useState([]);
  const [editingUser, setEditingUser] = useState(false);
  const [formData, setFormData] = useState({
    username: currUser.username,
    email: currUser.email,
    password: '',
  });

  if (!currUser) {
    return <div className="text-dblue">Loading.. </div>;
  }
  const filteredBills = bills.filter(bill => {
    return currUser.bill_users.some(billUser => billUser.bill_id === bill.id);
  });

  const handlePay = (billId) => {
    // Implement your pay functionality here
    console.log(`Paid bill ${billId}`);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditUser = () => {
    setEditingUser(true);
  };

  const handleCancelEdit = () => {
    setEditingUser(false);
  };

  const handleSaveUser = () => {
    fetch(`/users/${currUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log('Saving user info');
    setEditingUser(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-orange-500 flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl w-full md:w-2/3 lg:w-1/2">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          {editingUser ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              className="w-full border-b-2 border-blue-400 py-1 text-xl font-semibold text-blue-600 focus:outline-none focus:border-blue-600"
            />
          ) : (
            <span>{currUser.username}'s Account</span>
          )}
        </h2>
        {editingUser && (
          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full border-2 border-gray-400 p-2 mb-4 rounded-md"
            />
            <label htmlFor="password" className="block font-semibold text-gray-700 mb-2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              className="w-full border-2 border-gray-400 p-2 mb-4 rounded-md"
            />
            <div className="flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSaveUser}>
                Save
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {!editingUser && (
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleEditUser}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>


      {/* +++++ USER BILL INFO SECTION +++++ */ }

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
    </div >
  );
}
