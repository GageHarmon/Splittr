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
      {/* ++++++ FOOTER WITH NAVIGATION ++++++ */}
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
