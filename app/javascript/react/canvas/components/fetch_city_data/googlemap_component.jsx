import React, { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin } from '@vis.gl/react-google-maps';

const googleMapsApiKey = gon.google_maps_api_key; //コントローラーでgonに読み込ませたAPIキーを取得

export default function GoogleMapComponent({cityIdMapping, setCityId}) {

  const [selected, setSelected] = useState(null);
  const handleClose = () => {
    setSelected(null);
  }

  return (
    <Box>
      <APIProvider apiKey={googleMapsApiKey}>
        <Map
          mapId={'160dcc337dc1872'}
          style={{width: '100%', height: '35vh', margin: 'auto'}}
          defaultCenter={{lat: 36.6513, lng: 138.1810}}
          defaultZoom={4.6}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >        
          {cityIdMapping.map((city) => (
            <MarkerWithInfoWindow
              key={city.id}
              city={city}
              setCityId={setCityId}     //index.jsxから引き受けている
              InfoWindowOpen={ selected === city.id }
              onMarkerClick={() => {
                setSelected(city.id)
                console.log('city_id: ', city.id, 'city_name: ', city.name)
              }}
              setSelected={setSelected}
              handleClose={handleClose}
            />
          ))}
        </Map>
      </APIProvider>
    </Box>
  )
}

function MarkerWithInfoWindow({city, InfoWindowOpen, onMarkerClick, handleClose, setCityId}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={onMarkerClick}
        position={{lat: city.position.lat, lng: city.position.lng}}
        title={city.name}>
        <Pin
          background={'#22ccff'}
          borderColor={'#1e89a1'}
          glyphColor={'#0f677a'}></Pin>
      </AdvancedMarker>
      {InfoWindowOpen && (
        <InfoWindow
          anchor={marker}
          // maxWidth={200}
          onClose={handleClose}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>{city.name}</div>
              <Button 
                onClick={() => {
                  console.log('city_id: ', city.id, 'city_name: ', city.name)
                  setCityId(city.id);   //index.jsxから引き受けたsetCityId関数を実行し，選択した都市IDを更新
                }}
                variant='contained'
                size='small'
                sx={{
                  backgroundColor: '#76A284',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#5a7c65',
                  },
                  marginLeft: '10px' 
                }}
              >
                グラフに反映
              </Button>
            </div>
          </InfoWindow>
      )}
    </>
  )
}