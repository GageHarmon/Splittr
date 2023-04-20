// import React, { useState, useEffect } from 'react';

// export default function Group({ bills, users, currUser }) {
//   const [groups, setGroups] = useState([]);

//   if (!currUser) {
//     return <div>Loading.. </div>;
//   }

//   const filteredGroups = bills.map(group => {
//     return currUser.bill_users.some(groupUser => groupUser.group_id === group.id);
//   });

//   return (
//     <div className="user-activity">
//       <h2>{currUser.username}'s Groups:</h2>
//       <div>
//         <p>
//           {currUser.username} has {filteredGroups.length} groups.
//         </p>
//         <ul>
//           {filteredGroups.map(group => (
//             <li key={group.id}>
//               <div>
//                 <p>Group Name: {group.name}</p>

//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function Group({ bills, users, currUser }) {
  const [value, setValue] = useState('activity');
  const [groups, setGroups] = useState([]);

  if (!currUser) {
    return <div>Loading.. </div>;
  }

  const filteredGroups = bills.map(group => {
    return currUser.bill_users.some(groupUser => groupUser.group_id === group.id);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">
      <div className="bg-white p-6 mb-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-dblue">{currUser.username}'s Groups:</h2>
      </div>
      <div className="bg-white p-6 mb-8 mt-20 rounded-lg shadow-2xl">
        <p className="text-dblue font-bold">
          {currUser.username} has {filteredGroups.length} groups.
        </p>
        <ul className="text-dblue">
          {filteredGroups.map(group => (
            <li key={group.id}>
              <div>
                <p>Group Name: {group.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer activeLink={value} onChange={setValue} />
    </div>
  );
}
