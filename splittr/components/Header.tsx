import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold text-dblue">{title}</h2>
    </div>
  );
};

export default Header;
