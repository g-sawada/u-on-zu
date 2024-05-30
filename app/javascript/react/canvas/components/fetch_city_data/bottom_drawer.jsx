import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import CitySearchBox from './city_search_box';
import GoogleMapComponent from './googlemap_component';

export default function BottomDrawer({open, handleClose, bottomDrawerButtonRef, setCityId}) {
  // ドロワーの状態，ドロワー閉ハンドラ，下ドロワー起動ボタンのref，setCityId関数

  // ClickAwayListenerで指定する，ドロワー外をクリックした時の処理
  const handleClickAway = (event) => {
    //index.jsxから引き受けたRefを使って，起動ボタンをクリックした時はhandleCloseを実行しないようにする
    if (bottomDrawerButtonRef.current && bottomDrawerButtonRef.current.contains(event.target)) {
      return;
    }
    handleClose();
  }
  
  // モックデータ
  const cityIdMapping = [
    { id: 1, name: '東京', position: { lat: 35.6917, lng: 139.75, alt: 25.2 }},
    { id: 2, name: '大阪', position: { lat: 34.6817, lng: 135.5183, alt: 23.0 }},
    { id: 3, name: '札幌', position: { lat: 43.06, lng: 141.3283, alt: 17.4 }},
    { id: 4, name: '那覇', position: { lat: 26.2067, lng: 127.6867, alt: 28.1 }},
    ]

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Drawer
        variant='persistent'
        anchor='bottom'
        open={open}
        // onClose={handleClose}
      >
        {/* カラムから呼び出し */}
        <CitySearchBox cityIdMapping={cityIdMapping} setCityId={setCityId}/>
        
        {/* GoogleMapから呼び出し */}
        <Box 
          sx={{
            marginTop: '5px'
          }} 
        >
          <GoogleMapComponent setCityId={setCityId}/>
        </Box>
      </Drawer>
    </ClickAwayListener>
  );
}
