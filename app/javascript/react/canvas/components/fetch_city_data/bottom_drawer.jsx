import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

export default function BottomDrawer({open, handleClose}) {
  const [selectedCity, setSelectedCity] = useState(null);
  const handleChange = ( e, value) => {
    setSelectedCity(value);
  }
  const handleButtonClick = () => {
    if (selectedCity) {
      console.log('selectedCity.name:', selectedCity.name, 'selectedCity.id:', selectedCity.id);
    }
  }

  const cityIdMapping = [
    { id: 1, name: '東京' },
    { id: 2, name: '大阪' },
    { id: 3, name: '札幌' },
    { id: 4, name: '那覇' },
    ]

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={handleClose}
    >
      <Box 
        sx={{ 
          width: '100%', height: '200px', margin: '30px',
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
    </SwipeableDrawer>
  );
}
