import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

export default function BottomDrawer() {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { 
      return; 
    }
    setState(open);
  };

  const list = () => (
    <>
      <Box
        sx={{ width: '100%' }}
        role="presentation"
      >
        <textarea className='textarea textarea-bordered textarea-lg w-full h-80'></textarea>
      </Box>
    </>
  );

  return (
    <React.Fragment>
      <div className='my-5'>
        <button 
          className='btn btn-primary btn-sm' 
          onClick={toggleDrawer(true)}
        >
          Bottom
        </button>
      </div>
      <SwipeableDrawer
        anchor='bottom'
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
