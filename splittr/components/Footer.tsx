// import React from 'react';
// import Link from 'next/link';

// interface FooterProps {
//     activeLink: string;
//     onChange: (newValue: string) => void;
//   }
  
//   const Footer: React.FC<FooterProps> = ({ activeLink, onChange }) => {
//     const handleChange = (newValue: string) => {
//       onChange(newValue);
//     };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-2xl mt-auto mb-10">
//       <nav className="flex items-center justify-around space-x-40">
//         <Link href="/Account">
//           <div
//             className={`${
//               activeLink === 'Account' ? 'text-dblue' : ''
//             } focus:outline-none cursor-pointer`}
//             onClick={() => handleChange('Account')}
//           >
//             <span className="text-dblue font-bold">Account</span>
//           </div>
//         </Link>
//         <Link href="/Activity">
//           <div
//             className="focus:outline-none cursor-pointer"
//             onClick={() => handleChange('Activity')}
//           >
//             <span className="text-dblue font-bold">Activity</span>
//           </div>
//         </Link>
//         <Link href="/Group">
//           <div
//             className="focus:outline-none cursor-pointer"
//             onClick={() => handleChange('Group')}
//           >
//             <span className="text-dblue font-bold">Group</span>
//           </div>
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Footer;

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  activeLink: string;
  onChange: (newValue: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeLink, onChange }) => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl mt-auto mb-10">
      <nav className="flex items-center justify-around space-x-40">
        <Link href="/Home">
          <div
            className={`${
              activeLink === 'Home' ? 'text-dblue' : ''
            } focus:outline-none cursor-pointer`}
            onClick={() => handleChange('Home')}
          >
            <span className="text-dblue font-bold">Home</span>
          </div>
        </Link>
        <Link href="/Account">
          <div
            className={`${
              activeLink === 'Account' ? 'text-dblue' : ''
            } focus:outline-none cursor-pointer`}
            onClick={() => handleChange('Account')}
          >
            <span className="text-dblue font-bold">Account</span>
          </div>
        </Link>
        <Link href="/Activity">
          <div
            className="focus:outline-none cursor-pointer"
            onClick={() => handleChange('Activity')}
          >
            <span className="text-dblue font-bold">Activity</span>
          </div>
        </Link>
        <Link href="/Group">
          <div
            className="focus:outline-none cursor-pointer"
            onClick={() => handleChange('Group')}
          >
            <span className="text-dblue font-bold">Group</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Footer;
