import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, TextField, Button, List, ListItem, ListItemText, Paper, Avatar, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import { useRouter } from 'next/router';

interface HomeProps {
  currUser: any;
}

export default function Home({ currUser }: HomeProps) {
  const router = useRouter();
  const [value, setValue] = useState('activity');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    router.push(`/${newValue}`);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Splittr</Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
        </Grid>
        <Grid item>
          <Typography variant="h6">{currUser ? currUser.username : 'Loading...'}</Typography>
        </Grid>
      </Grid>

      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Account" value="Account" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="Activity" value="Activity" icon={<ListAltIcon />} />
        <BottomNavigationAction label="Group" value="Group" icon={<GroupIcon />} />
      </BottomNavigation>
    </div>
  );
  }