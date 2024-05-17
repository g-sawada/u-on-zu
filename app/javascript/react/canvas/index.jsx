import React from 'react';
import Graph from './components/graph';
import PersistentDrawerRight from './components/right_drawer';
import BottomDrawer from './components/bottom_drawer';

export default function CanvasApp() {
  return (
    <div className=''>
      {/* <div className='flex flex-1 justify-center items-center bg-blue-200'>
        <div className='mt-10'>
          <Graph />
        </div>
      </div>
      <div className='w-full flex-shrink-0 max-w-xs bg-green-200 '>
        テスト
      </div> */}
      <PersistentDrawerRight />
      <BottomDrawer />
    </div>
  )
}