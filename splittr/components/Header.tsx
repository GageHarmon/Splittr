import React from 'react';
import { useRouter } from 'next/router';

interface HeaderProps {
  title: string;
  currUser?: any;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();

  function handleLogout(e) {
    e.preventDefault();
    fetch("/logout",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    router.push('/')
  }

  return (
    <header className='bg-gradient-to-br from-rorange to-rblue'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <div className='text-dblue text-6xl font-bold'>{title}</div>
          <nav>
            {/* You can add more nav links here */}
            <form onSubmit={handleLogout} className='inline'>
              <button type="submit" className='text-dblue font-semibold text-2xl'>
                Logout
              </button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
