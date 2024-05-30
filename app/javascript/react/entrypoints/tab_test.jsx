import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{width: '100%', height: '60vh'}}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'relative', // Add this
  },
  tabs: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  tabpanels: {
    position: 'relative', // Add this
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <AppBar position="static" style={{opacity: 0.5}}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </div>
      <div className={classes.tabpanels}>
        <TabPanel value={value} index={0}>
          <img src="https://images.pexels.com/photos/19395799/pexels-photo-19395799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="sample" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <img src='https://images.pexels.com/photos/24863011/pexels-photo-24863011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='sample' />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <img src='https://images.pexels.com/photos/18045900/pexels-photo-18045900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='sample' />
        </TabPanel>
      </div>
    </div>
  );
}