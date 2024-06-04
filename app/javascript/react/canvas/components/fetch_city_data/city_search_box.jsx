import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function CitySearchBox({cityIdMapping, setCityId}) {
  // セレクトボックスで選択中の都市情報を保持するステート
  const [selectedCity, setSelectedCity] = useState(null);
  
  // 都市名セレクトボックスの変更ハンドラ
  const handleChange = (e, value) => {
    setSelectedCity(value);
  }
  // 都市名選択の反映実行ボタンクリックのハンドラ
  const handleButtonClick = () => {
    if (selectedCity) {
      setCityId(selectedCity.id);   //index.jsxから引き受けたsetCityId関数を実行し，選択した都市IDを更新
    }
  }

  // ボタンのスタイリング
  const customButtonStyles = {
    backgroundColor: '#76A284',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5a7c65',
    },
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'start',
        paddingTop: '40px'
      }}
      // role="presentation"
    >
      <Autocomplete
      onChange={handleChange}
      disablePortal
      options={cityIdMapping}
      getOptionLabel={(option) => option.name}
      size='midium'
      sx={{ 
        width: 300,
        height: 50,
      }}
      renderInput={(params) => <TextField {...params} label="都市を検索/選択" />}
      />
      <Button 
        onClick={handleButtonClick}
        variant='contained'
        size='large'
        sx={{ 
          ...customButtonStyles,
          fontWeight: 'bold',
          height: '56px',
          marginLeft: '20px' }}
      >
        グラフに反映
      </Button>
    </Box>
  )
}

