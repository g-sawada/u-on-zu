import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
  Label,
} from 'recharts';
import { data_tokyo } from './tokyo';

export default function Graph({ lineDotSize }) {
  const annualRain = data_tokyo.reduce((total, item) => total + item.rain, 0);
  const annualAveTemp = (data_tokyo.reduce((total, item) => total + item.temp_ave, 0) / 12);

  // const [lineDotSize, setLineDotSize] = useState(4);
  const [barStrokeWidth, setBarStrokeWidth] = useState(1);
  const [tempDomainMax, setTempDomainMax] = useState(40);

  const handleChangeNumber = (setter) => (e) => {
    if (e.target.value !== '') {
      setter(Number(e.target.value));
    }
    console.log(e.target.value);
  }

  const style = {fontFamily: "sans-serif, serif"}; //sans-serif→ゴシック，serif→明朝
  return (
    <div style={style}>
      <div className="my-10">ここはGraphコンポーネントの中: { lineDotSize }</div>
      <ResponsiveContainer id="main-graph-container" height={500} width={500}>
        <ComposedChart
          data={data_tokyo}
          margin={{
            top: 50,
            right: 20,
            bottom: 60,
            left: 20,
          }}
          barGap={0}
          id="main-graph"
        >
          <rect width="100%" height="100%" fill="white" />
          <text x={500 / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize="24">東京</tspan>
          </text>
          <CartesianGrid 
            strokeDasharray=""
            vertical={false}
            stroke="gray"
            strokeOpacity={0.5}
            fill="white"
            fillOpacity={0.2}
            />
          <XAxis 
            dataKey="month"
            scale="auto"
            stroke="black"
            />
          <YAxis
            yAxisId={1}
            domain={[-30, tempDomainMax]}
            tickCount={8}
            stroke="black">
            <Label value="気　温" dx={-25} writingMode="tb" fontSize={20} fill="black"/>
            <Label value="(°Ｃ)" fontSize={12} fill="black" position="insideTopLeft" dx={20} dy={-30}/>
          </YAxis>
          <YAxis 
            yAxisId={2}
            orientation="right"
            domain={[0, 700]}
            tickCount={8}
            stroke="black"
            >
            <Label value="降水量" dx={25} writingMode="tb" fontSize={20} fill="black"/>
            <Label value="(mm)" fontSize={12} fill="black" position="insideTopLeft" dx={7} dy={-30}/>
          </YAxis>
          <Line 
            yAxisId={1}
            isAnimationActive={false}
            type="linear"
            dataKey="temp_ave"
            dot={{ r: lineDotSize }}
            stroke="red"
            strokeWidth={1.5}/>
          <Bar 
            yAxisId={2}
            dataKey="rain"
            barSize={50}
            fill="cyan"
            stroke="black"
            strokeWidth={barStrokeWidth}
            />
          <Tooltip />
          <text x={500 / 2} y={460} fill="black" textAnchor="middle" dominantBaseline="central">
              <tspan fontSize="16">年平均気温: {annualAveTemp.toFixed(1)}°C，年間降水量: {annualRain.toFixed(1)}mm </tspan>
          </text>
        </ComposedChart>
      </ResponsiveContainer>

      

      {/* <div id="input">
        <div>DotSize</div>
        <input type='number' step={0.5} value={lineDotSize} onChange={handleChangeNumber(setLineDotSize)}/>
        <p>DotSize: {lineDotSize} </p>
      </div>
      <div id="input2">
        <div>BarStrokeWidth</div>
        <input type='number' step={0.5} value={barStrokeWidth} onChange={handleChangeNumber(setBarStrokeWidth)}/>
        <p>BarStrokeWidth: {barStrokeWidth} </p>
      </div>
      <div id="input3">
        <div>TempMax</div>
          <input type='number' step={5} value={tempDomainMax} onChange={handleChangeNumber(setTempDomainMax)}/>
          <p>TempMax: {tempDomainMax} </p>
      </div> */}
    </div>
  );
}
