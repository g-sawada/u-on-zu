import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

export default function BottomDrawer({open, handleClose}) {

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
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={handleClose}
    >
      {list()}
    </SwipeableDrawer>
  );
}
