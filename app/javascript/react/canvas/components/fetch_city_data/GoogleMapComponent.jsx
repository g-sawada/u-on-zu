import React, { useCallback, useRef, useState } from 'react';
import { Button } from '@mui/material';

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin } from '@vis.gl/react-google-maps';

const googleMapsApiKey = gon.google_maps_api_key; //コントローラーでgonに読み込ませたAPIキーを取得

export default function GoogleMapComponent({setCityId}) {
  //モックデータ
  const cityIdMapping = [
    { id: 1, name: '東京', position: { lat: 35.6917, lng: 139.75, alt: 25.2 }},
    { id: 2, name: '大阪', position: { lat: 34.6817, lng: 135.5183, alt: 23.0 }},
    { id: 3, name: '札幌', position: { lat: 43.06, lng: 141.3283, alt: 17.4 }},
    { id: 4, name: '那覇', position: { lat: 26.2067, lng: 127.6867, alt: 28.1 }},
  ]
  const [selected, setSelected] = useState(null);
  const handleClose = () => {
    setSelected(null);
  }

  return (
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
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start', 
              }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{city.name}</div>
              <Button 
                onClick={() => {
                  console.log('city_id: ', city.id, 'city_name: ', city.name)
                  setCityId(city.id);   //index.jsxから引き受けたsetCityId関数を実行し，選択した都市IDを更新
                }}
                variant='contained'
                size='small'
                sx={{ marginLeft: '10px' }}
              >
                グラフに反映
              </Button>
            </div>
          </InfoWindow>
      )}
    </>
  )
}