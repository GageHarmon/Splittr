import React, { useState, useEffect } from 'react';

export default function Group({ bills, users, currUser }) {
  const [groups, setGroups] = useState([]);

  if (!currUser) {
    return <div>Loading.. </div>;
  }

  const filteredGroups = bills.map(group => {
    return currUser.bill_users.some(groupUser => groupUser.group_id === group.id);
  });
  console.log(filteredGroups);
  return (
    <div className="user-activity">
      <h2>{currUser.username}'s Groups:</h2>
      <div>
        <p>Hello World!</p>
        <p>
          {currUser.username} has {filteredGroups.length} groups.
        </p>
        <ul>
          {filteredGroups.map(group => (
            <li key={group.id}>
              <div>
                <p>Group Name: {group.name}</p>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
