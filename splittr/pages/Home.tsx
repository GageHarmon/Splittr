import React, { useState } from 'react';
import Footer from '../components/Footer';


interface HomeProps {
  currUser: any;
}

export default function Home({ currUser }: HomeProps) {
  if (!currUser) {
    return <div className="text-dblue">Loading.. </div>;
  }
  
  const [value, setValue] = useState('activity');
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      {/* ++++ USER SECTION ++++ */}
      <div className="bg-gradient-to-br from-rorange to-rblue p-4 mb-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-dblue">Welcome {currUser.username}</h2>
      </div>

      {/* Update Username Button */}
      <div className="bg-gradient-to-br from-rorange to-rblue p-4 m-auto rounded-lg shadow-2xl">
        <button className="bg-blue-500 text-dblue px-4 py-2 rounded font-bold" onClick={toggleForm}>
          Update Username
        </button>
      </div>

      {/* Update Username Form */}
      {showForm && (
        <div className="bg-white p-4 mt-4 rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="block mb-2 text-dblue font-bold">New Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-gray-300 p-2 rounded w-full mb-4"
              required
            />
            <button type="submit" className="bg-green-500 text-dblue px-4 py-2 rounded font-bold">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* ++++++ FOOTER WITH NAVIGATION ++++++ */}
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
