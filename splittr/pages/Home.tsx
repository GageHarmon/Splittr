import React, { useState } from 'react';
import Footer from '../components/Footer';


interface HomeProps {
  currUser: any;
}

export default function Home({ currUser }: HomeProps) {
  const [value, setValue] = useState('activity');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      {/* ++++ USER SECTION ++++ */}
      <div className="bg-white p-6 mb-8 mt-20 rounded-lg shadow-2xl flex items-center space-x-4">
        <div>
          {/* Avatar would go here */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 mb-8 w-full max-w-screen-md">
        <div className="bg-white rounded-lg shadow-2xl">
        </div>
        <div className="bg-white rounded-lg shadow-2xl">
        </div>
      </div>

      {/* ++++++ FOOTER WITH NAVIGATION ++++++ */}
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
