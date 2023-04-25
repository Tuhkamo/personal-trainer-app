import './App.css';
import React from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import { Tab, Tabs, Box, Toolbar, Typography, AppBar } from '@mui/material';
import { TabContext } from '@mui/lab';
import TabPanel from '@mui/lab/TabPanel';
import Calendarpage from './components/Calendarpage';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventIcon from '@mui/icons-material/Event';
import AppsIcon from '@mui/icons-material/Apps';

function App() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
        <AppsIcon style={{ marginRight: 10 }}></AppsIcon>
          <Typography>
             Training App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={<><PersonIcon />Customers</>} value="1" />
              <Tab label={<><FitnessCenterIcon />Trainings</>} value="2" />
              <Tab label={<><EventIcon />Calendar</>} value="3" />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <Customerlist />
          </TabPanel>
          <TabPanel value="2">
            <Traininglist />
          </TabPanel>
          <TabPanel value="3">
            <Calendarpage />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;
