import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import GoogleMapComponent from './GoogleMapComponent';

export default function BottomDrawer({open, handleClose, setCityId}) {
  const [selectedCity, setSelectedCity] = useState(null);
  const handleChange = (e, value) => {
    setSelectedCity(value);
  }
  const handleButtonClick = () => {
    if (selectedCity) {
      console.log('selectedCity.name:', selectedCity.name, 'selectedCity.id:', selectedCity.id);
      setCityId(selectedCity.id);   //index.jsxから引き受けたsetCityId関数を実行し，選択した都市IDを更新
    }
  }

  const cityIdMapping = [
    { id: 1, name: '東京', position: { lat: 35.6917, lng: 139.75, alt: 25.2 }},
    { id: 2, name: '大阪', position: { lat: 34.6817, lng: 135.5183, alt: 23.0 }},
    { id: 3, name: '札幌', position: { lat: 43.06, lng: 141.3283, alt: 17.4 }},
    { id: 4, name: '那覇', position: { lat: 26.2067, lng: 127.6867, alt: 28.1 }},
    ]

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={handleClose}
    >
      {/* カラムから呼び出し */}
      <Box 
        sx={{ 
          width: '100%',
          // height: '200px',
          margin: '30px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        role="presentation">
        <Autocomplete
        onChange={handleChange}
        disablePortal
        options={cityIdMapping}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300, height: 50}}
        renderInput={(params) => <TextField {...params} label="都市を選択" />}
        />
        <Button 
          onClick={handleButtonClick}
          variant='contained'
          size='large'
          sx={{ height: 50, marginLeft: '20px' }}
        >
          グラフに反映
        </Button>
      </Box>
      
      {/* GoogleMapから呼び出し */}
      <Box 
        sx={{
          margin: '10px'
        }} 
      >
        <GoogleMapComponent setCityId={setCityId}/>
      </Box>

    </SwipeableDrawer>
  );
}
