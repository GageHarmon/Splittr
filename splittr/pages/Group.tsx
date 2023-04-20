import React, { useState } from 'react';
import Footer from '../components/Footer';

export default function Group({ bills, users, currUser }) {
  const [value, setValue] = useState('activity');
  const [groups, setGroups] = useState([]);
  const [newBillTitle, setNewBillTitle] = useState('');
  const [newBillUsers, setNewBillUsers] = useState([]);

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

  const handleNewBillUserChange = (event) => {
    const selectedUser = event.target.value;
    const userExists = newBillUsers.find(user => user === selectedUser);
    if (!userExists) {
      setNewBillUsers([...newBillUsers, selectedUser]);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBill = {
      title: newBillTitle,
      total_amount: 0,
      bill_users: newBillUsers.map(username => {
        const user = users.find(user => user.username === username);
        return { user_id: user.id }
      })
    }
    setGroups([...groups, newBill]);
    setNewBillTitle('');
    setNewBillUsers([]);
  }

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-dblue">{currUser.username}'s Groups:</h2>
      </div>

      {/* +++++ USER GROUP INFO SECTION +++++ */}
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl w-full max-w-screen-md">
        <p className="text-dblue font-bold">
          {currUser.username} has {filteredGroups.length} Groups.
        </p>
        <ul>
          {filteredGroups.map(group => (
            <li key={group.id} className="mb-4">
              <div className="bg-white p-4 rounded-lg shadow-2xl">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-dblue">{group.title}</h3>
                  <p className="font-bold text-lg text-dblue">Entire Bill: ${group.total_amount}.00</p>
                </div>
                <ul>
                  {group.bill_users.map(user => (
                  <li key={user.id} className="mb-2">
                    <p>
                      <span className="text-dblue font-bold">User:</span> <span className="text-dblue">{user.user.username}</span>
                    </p>
                  </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* +++++ CREATE NEW BILL SECTION +++++ */}
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl w-full max-w-screen-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="font-bold mb-2 text-dblue" htmlFor="new-bill-title">
              New Bill Title:
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
            <label className="font-bold mb-2 text-dblue" htmlFor="new-bill-users">
              Add Users:
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
            <label className="font-bold mb-2 text-dblue" htmlFor="new-bill-users">
              Added Users:
            </label>
            <ul>
              {newBillUsers.map(user => (
                <li key={user} className="text-dblue">{user}</li>
              ))}
            </ul>
          </div>
          <button
            className="bg-rorange hover:bg-rorange text-dblue font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create Bill
          </button>
        </form>
      </div>
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}