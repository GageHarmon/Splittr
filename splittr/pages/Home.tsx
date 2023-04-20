// import React, { useState } from 'react';
// import { AppBar, Toolbar, Typography, Grid, TextField, Button, List, ListItem, ListItemText, Paper, Avatar, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import GroupIcon from '@mui/icons-material/Group';
// import { useRouter } from 'next/router';

// interface HomeProps {
//   currUser: any;
// }

// export default function Home({ currUser }: HomeProps) {
//   const router = useRouter();
//   const [value, setValue] = useState('activity');

//   const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
//     setValue(newValue);
//     router.push(`/${newValue}`);
//   };

//   return (
//     <div>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6">Splittr</Typography>
//         </Toolbar>
//       </AppBar>

//         {/* <MainProfile> */}
//           <Grid container spacing={2} alignItems="center">
//             <Grid item>
//               {/* <LargeAvatar /> */}
//             </Grid>
//             <Grid item>
//               <Typography variant="h6">Username</Typography>
//             </Grid>
//           </Grid>
//         {/* </MainProfile> */}

//         <Grid container spacing={3} style={{ padding: 24 }}>
//           <Grid item xs={12} md={6}>
//             {/* ... */}
//           </Grid>
//           <Grid item xs={12} md={6}>
//             {/* ... */}
//           </Grid>
//         </Grid>

//         {/* <Footer> */}
//           <BottomNavigation value={value} onChange={handleChange} showLabels>
//             <BottomNavigationAction label="Account" value="Account" icon={<AccountCircleIcon />} />
//             <BottomNavigationAction label="Activity" value="Activity" icon={<ListAltIcon />} />
//             <BottomNavigationAction label="Group" value="Group" icon={<GroupIcon />} />
//           </BottomNavigation>
//         {/* </Footer> */}
//       </div>
//   );
//   }

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface HomeProps {
  currUser: any;
}

export default function Home({ currUser }: HomeProps) {
  const [value, setValue] = useState('activity');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rblue to-rorange flex flex-col justify-start items-center pt-12">

{/* ++++++ HEADER ++++++ */}
      <Header title="Splittr" />

{/* ++++ USER SECTION ++++ */}
      <div className="bg-white p-6 mb-8 mt-20 rounded-lg shadow-2xl flex items-center space-x-4">
        <div>
          {/* Avatar would go here */}
        </div>
        <div>
          <h2 className="text-xl font-bold text-dblue">Username</h2>
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
