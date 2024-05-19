import React from 'react';
import Graph from './components/graph/graph';
import MainWithRightDrawer from './components/main_with_right_drawer';
import BottomDrawer from './components/bottom_drawer';

export default function CanvasApp() {

  return (
    <div className=''>
      <MainWithRightDrawer />
      <BottomDrawer />      
    </div>
  )
}