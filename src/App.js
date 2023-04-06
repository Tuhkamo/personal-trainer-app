import './App.css';
import React from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Tab, Tabs, Box } from '@mui/material';
import { TabContext } from '@mui/lab';
import TabPanel from '@mui/lab/TabPanel';

function App() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };




  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography>
            Training App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Customers" value="1" />
              <Tab label="Trainings" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <Customerlist/>
          </TabPanel>
          <TabPanel value="2">
            <Traininglist/>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;
