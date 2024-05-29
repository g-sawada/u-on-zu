import React, { useCallback, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StyledEngineProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

// GoogleMapテスト
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Marker, InfoWindow } from "@react-google-maps/api";


const libraries = ["places"];
const mapContainerStyle = {
  height: "60vh",
  width: "100%",
};
// 地図の大きさを指定します。

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: true,
};
//マーカーを描画するコンポーネント
function CityMarkers() {
  //モックデータ
  const cityIdMapping = [
    { id: 1, name: '東京', position: { lat: 35.6917, lng: 139.75, alt: 25.2 }},
    { id: 2, name: '大阪', position: { lat: 34.6817, lng: 135.5183, alt: 23.0 }},
    { id: 3, name: '札幌', position: { lat: 43.06, lng: 141.3283, alt: 17.4 }},
    { id: 4, name: '那覇', position: { lat: 26.2067, lng: 127.6867, alt: 28.1 }},
  ]

  const [selected, setSelected] = useState(null);

  return (
    <>
      {cityIdMapping.map((city) => (
        <Marker 
          key={city.id}
          position={{ lat: city.position.lat, lng: city.position.lng }}
          onClick={() => {
            console.log('city_id: ', city.id, 'city_name: ', city.name)
          }}
          onMouseOver={() => {
            setSelected(city);
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{ lat: selected.position.lat, lng: selected.position.lng }}
          onCloseClick={() => {
            setSelected(null)
          }}
        >
          <>
            <div>id: {selected.id}</div>
            <div>都市名: {selected.name}</div>
          </>
        </InfoWindow>
      ) : null}
    </>
  );
}



export default function GoogleMapComponent() {
  const googleMapsApiKey = gon.google_maps_api_key; //コントローラーでgonに読み込ませたAPIキーを取得

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey, // APIキーを指定
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  // API読み込み後に再レンダーを引き起こさないため、useStateを使わず、useRefとuseCallbackを使っています。

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={4.6} // デフォルトズーム倍率を指定します。
      center={{
        lat: 36.6513,
        lng: 138.1810,
      }} // 地図の中心を指定。長野がちょうどいいらしい？
      options={options}
      onLoad={onMapLoad}
    >
      <CityMarkers/>
    </GoogleMap>
  );
}

document.addEventListener('turbo:load', () => {
  const container = document.getElementById('test_map');
  if (container) {
  createRoot(container).render(<GoogleMapComponent />);
  } else {
  console.log('test_map not found');
  }
})


function Test() {

  return (
    <>
      <div className="text-2xl m-10">
        <h1>My React App</h1>
        <p>It works!</p>
      </div>
      <Button variant="contained">Hello World</Button>
      {/* アコーディオン */}
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked /> 
        <div className="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div className="collapse-content"> 
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" /> 
        <div className="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div className="collapse-content"> 
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" /> 
        <div className="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div className="collapse-content"> 
          <p>hello</p>
        </div>
      </div>


    </>
  );
}

document.addEventListener('turbo:load', () => {
  const container = document.getElementById('test_app');
  if (container) {
  createRoot(container).render(<Test />);
  } else {
  console.log('test_app not found');
  }
})

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function TestGraph() {
  return (
    <ResponsiveContainer width={400} height={400} >
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis 
          domain={[0, 12000]}
          ticks={[-3000, 0, 3000, 6000, 9000, 12000]}
          />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
document.addEventListener('turbo:load', () => {
  const container = document.getElementById('test_graph');
  if (container) {
  createRoot(container).render(<TestGraph />);
  } else {
  console.log('test_graph not found');
  }
})
