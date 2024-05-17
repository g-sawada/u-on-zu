import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Graph from './graph/graph';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: 'relative',
  }),
);

export default function PersistentDrawerRight() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles({
    drawer: {
      position: 'relative',
      marginLeft: "auto",
      width: drawerWidth,
      "& .MuiBackdrop-root": {
        display: "none"
      },
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        height: "100%",
        position: "absolute",
        backgroundColor: "green",
      }
    }
  });
  const classes = useStyles();


  return (
    <Box sx={{ display: 'flex' }} className='bg-red-200'>
      <Main open={open}>
        <button onClick={handleDrawerOpen} className='btn btn-info'>Right</button>

        {/* ここにグラフ */}
        <div className='flex justify-center items-center bg-blue-200'>
          <Graph />
        </div>

      </Main>
        <Drawer
          sx={{
            position: 'relative',
            marginLeft: "auto",
            width: drawerWidth,
            "& .MuiBackdrop-root": {
              display: "none"
            },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              height: "100%",
              position: "absolute",
              backgroundColor: "limegreen",
            }
          }}
          // className={[classes.drawer, 'text-3xl']}
          variant="persistent"
          anchor="right"
          open={open}
        > 
          {/* ここからDrawerの中身 */}
          <div width='100%' height='100%' className='bg-red'>
            <div onClick={handleDrawerClose} className='btn btn-primary'>Close</div>
            <div className='font-bold'>これはドロワーの中身です</div>
          </div>

        </Drawer>
    </Box>
  );
}