import React from 'react';
import { AppBar,Toolbar,Typography,Grid,TextField,Button,List,ListItem,ListItemText,Paper,Avatar,Box,BottomNavigation,BottomNavigationAction} from '@mui/material';
// import { styled, createTheme, ThemeProvider } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import { useRouter } from 'next/router';

// const theme = createTheme({
//     palette: {
//       background: {
//         paper: '#fff',
//       },
//     },
//   });

// const MainProfile = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(3),
// }));

// const LargeAvatar = styled(Avatar)(({ theme }) => ({
//   width: theme.spacing(7),
//   height: theme.spacing(7),
// }));

// const Footer = styled(Box)(({ theme }) => ({
//   position: 'fixed',
//   bottom: 0,
//   width: '100%',
//   backgroundColor: theme.palette.background.paper,
// }));

export default function Home() {
  const router = useRouter();

  const [value, setValue] = React.useState('activity');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    router.push(`/${newValue}`);
  };

  return (
    // <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Splittr</Typography>
          </Toolbar>
        </AppBar>

        {/* <MainProfile> */}
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              {/* <LargeAvatar /> */}
            </Grid>
            <Grid item>
              <Typography variant="h6">Username</Typography>
            </Grid>
          </Grid>
        {/* </MainProfile> */}

        <Grid container spacing={3} style={{ padding: 24 }}>
          <Grid item xs={12} md={6}>
            {/* ... */}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* ... */}
          </Grid>
        </Grid>

        {/* <Footer> */}
          <BottomNavigation value={value} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Account" value="Account" icon={<AccountCircleIcon />} />
            <BottomNavigationAction label="Activity" value="Activity" icon={<ListAltIcon />} />
            <BottomNavigationAction label="Group" value="Group" icon={<GroupIcon />} />
          </BottomNavigation>
        {/* </Footer> */}
      </div>
    // </ThemeProvider>
  );
}