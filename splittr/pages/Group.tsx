import React, { useState } from 'react';
import Footer from '../components/Footer';

export default function Group({ bills, users, currUser }) {
  const [value, setValue] = useState('activity');
  const [groups, setGroups] = useState([]);
  const [newBillTitle, setNewBillTitle] = useState('');
  const [newBillAmount, setNewBillAmount] = useState(0);
  const [newBillUsers, setNewBillUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBill, setEditBill] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);


  if (!currUser || bills.length === 0) {
    return <div className="text-dblue">Loading.. </div>;
  }

  const filteredGroups = currUser.bill_users.map(bill => {
    return bills.filter(singlebill => singlebill.id === bill.bill_id)[0]
  })
  console.log(filteredGroups)

  const handleNewBillTitleChange = (event) => {
    setNewBillTitle(event.target.value);
  }

  const handleNewBillAmountChange = (event) => {
    setNewBillAmount(event.target.value);
  }

  const handleNewBillUserChange = (event) => {
    const selectedUser = event.target.value;
    const userExists = newBillUsers.find(user => user === selectedUser);
    if (!userExists) {
      setNewBillUsers([...newBillUsers, selectedUser]);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBill = {
      title: newBillTitle,
      total_amount: newBillAmount,
      bill_users: newBillUsers.map(username => {
        const user = users.find(user => user.username === username);
        console.log(user)
        return { user_id: user.id }
      })
    }
    console.log(newBill)
    try {
      const response = await fetch('/bills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBill)
      });

      if (response.ok) {
        const data = await response.json();
        setGroups([...groups, data]);
        setNewBillTitle('');
        setNewBillAmount(0);
        setNewBillUsers([]);
        setShowForm(false);
      } else {
        throw new Error('Error creating new bill');
      }
    } catch (error) {
      console.error(error);
    }
  };



  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <div className="user-activity">
          <h2 className="text-3xl font-bold text-dblue">{currUser.username}'s Groups:</h2>
          <div>
            <p className="text-lg font-bold text-dblue mb-2">
              {currUser.username} has {filteredGroups.length} Groups
            </p>
            <ul>
              {filteredGroups.map(bill => (
                <li key={bill.id} className="bg-gray-100 rounded-md shadow-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">{bill.title}</h3>
                    <p className="font-bold text-lg text-dblue m-auto">Entire Bill:
                      ${bill.total_amount}.00</p>
                  </div>
                  <ul>
                    {bill.bill_users.map(user => (
                      <li key={user.id} className="mb-2 ">
                        <p className="text-dblue">Username: {user.user.username} </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="font-bold text-dblue mb-2" htmlFor="new-bill-title">
                New Bill Name
              </label>
              <input
                className="border rounded py-2 px-3 text-grey-darkest"
                id="new-bill-title"
                type="text"
                value={newBillTitle}
                onChange={handleNewBillTitleChange}
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-bold text-dblue mb-2" htmlFor="new-bill-amount">
                Amount
              </label>
              <input
                className="border rounded py-2 px-3 text-grey-darkest"
                id="new-bill-amount"
                type="number"
                value={newBillAmount}
                onChange={handleNewBillAmountChange}
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="font-bold text-dblue mb-2" htmlFor="new-bill-users">
                Add Users
              </label>
              <select
                className="border rounded py-2 px-3 text-grey-darkest"
                id="new-bill-users"
                value={newBillUsers}
                onChange={handleNewBillUserChange}
                required
              >
                <option value="" disabled>Select a user</option>
                {users && users.map(user => (
                  <option key={user.id} value={user.username}>{user.username}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="font-bold text-dblue mb-2" htmlFor="new-bill-users">
                Added Users
              </label>
              <ul>
                {newBillUsers.map(user => (
                  <li key={user.id} className=" text-dblue">{user}</li>
                ))}
              </ul>
            </div>
            <button
              className="bg-rorange hover:bg-rorange text-dblue font-bold py-2 px-4 rounded"
              type="submit">
              Create Bill
            </button>
          </form>
        </div>
      </div>
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
