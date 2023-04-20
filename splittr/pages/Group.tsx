import React, { useState } from 'react';
import Footer from '../components/Footer';

export default function Group({ bills, users, currUser }) {
  const [value, setValue] = useState('activity');
  const [groups, setGroups] = useState([]);

  if (!currUser || bills.length === 0) {
    return <div className="text-dblue">Loading.. </div>;
  }

  const filteredGroups = currUser.bill_users.map(bill => {
    return bills.filter(singlebill => singlebill.id === bill.bill_id)[0]
  })

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-dblue">{currUser.username}'s Groups</h2>
      </div>

      {/* +++++ USER GROUP SECTION +++++ */}
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl w-full max-w-screen-md mt-20">
        <p className="text-dblue font-bold">
          {currUser.username} has {filteredGroups.length} Groups.
        </p>
        <ul>
          {filteredGroups.map(bill => (
            <li key={bill.id} className="mb-4">
              <div className="bg-white p-4 rounded-lg shadow-2xl">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-dblue font-bold">{bill.title}</h3>
                  <p className="text-dblue font-bold">Entire Bill: ${bill.total_amount}.00</p>
                </div>
                <ul>
                  {bill.bill_users.map(user => (
                    <li key={user.id} className="mt-2">
                      <p className="text-dblue">Username: {user.user.username} </p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="bg-rblue text-white font-bold py-2 px-4 rounded mt-4"onClick={toggleForm}>
          Create Group
        </button>

        {showForm && (
          <form className="mt-4">
            <div className="mb-4">
              <label htmlFor="groupName" className="block text-dblue font-bold mb-2">
                Group Name:
              </label>
              <input
                type="text"
                id="groupName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-dblue leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter group name"
              />
            </div>
            {/* Add more form fields as needed */}
            <button
              type="submit"
              className="bg-rblue text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        )}
      </div>
      {/* <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <form >
          <label htmlFor="group">Create a Group</label>
          <input type="text" name="group" id="group" />
          <button type="submit">Submit</button>
        </form>
      </div> */}
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}