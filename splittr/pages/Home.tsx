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
      <div className="bg-gradient-to-br from-rorange to-rblue p-4 mb-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-dblue">Welcome</h2>
      </div>
      {/* ++++++ FOOTER WITH NAVIGATION ++++++ */}
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}