import React from 'react';
import { createRoot } from 'react-dom/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StyledEngineProvider } from '@mui/material/styles';
import BottomDrawer from '../canvas/components/bottom_drawer';

function Test() {
  return (
    <>
      <div className="text-2xl m-10">
        <h1>My React App</h1>
        <p>It works!</p>
      </div>
      <StyledEngineProvider injectFirst>
        <BottomDrawer />
      </StyledEngineProvider>
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
        <YAxis />
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
