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

export default function Graph({ data, sv }) {
  const climData = data.climateDataset

  const annualRain = climData.reduce((total, item) => total + item.rain, 0);
  const annualAveTemp = (climData.reduce((total, item) => total + item.temp_ave, 0) / 12);

  //domain（[min, max]）から指定した数の目盛りを生成する関数
  const generateTicks = (domain, tickCount) => {
    const [min, max] = domain;
    const step = (max - min) / (tickCount - 1);
    return Array.from({ length: tickCount }, (_, i) => min + i * step);
  }

  const style = {fontFamily: sv.fontfamily }; //sans-serif→ゴシック，serif→明朝
  return (
    <div style={style}>
      {/* <div className="my-10">ここはGraphコンポーネントの中: { sv.dotSize }</div> */}
      <ResponsiveContainer id="main-graph-container" height={ Number(sv.layoutHeight)} width={Number(sv.layoutWidth)}>
        <ComposedChart
          data={climData}
          margin={{
            top: Number(sv.marginTop),
            bottom: Number(sv.marginBottom),
            left: Number(sv.marginLeft),
            right: Number(sv.marginRight),
          }}
          barGap={0}
          id="main-graph"
        >
          <rect width="100%" height="100%" fill={`${sv.backgroundColor}`}  />
          <text x={Number(sv.layoutWidth) / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize={`${sv.titleFontSize}`} fill={`${sv.titleFontColor}`}>{sv.title}</tspan>
          </text>
          <CartesianGrid 
            strokeDasharray=""
            vertical={false}
            stroke="gray"
            strokeOpacity={0.5}
            fill="white"
            fillOpacity={0}
            />
          <XAxis 
            dataKey="month"
            scale="auto"
            stroke="black"
            strokeWidth={Number(sv.xAxisLineWidth)}
            />
          <YAxis
            yAxisId={1}
            type="number"
            domain={[Number(sv.tempMin), Number(sv.tempMax)]}
            ticks={generateTicks([Number(sv.tempMin), Number(sv.tempMax)], Number(sv.scaleCount))}
            tickFormatter={(value) => Number.isInteger(value) ? value : value.toFixed(1)}   //小数点があれば1桁まで表示       
            allowDataOverflow  //データが範囲外表示になることを許可
            // includeHidden
            stroke="black">
            <Label value="気　温" dx={-25} writingMode="tb" fontSize={20} fill="black"/>
            <Label value="(°Ｃ)" fontSize={12} fill="black" position="insideTopLeft" dx={20} dy={-30}/>
          </YAxis>
          <YAxis 
            yAxisId={2}
            orientation="right"
            domain={[0, Number(sv.rainMax)]}
            ticks={generateTicks([0, Number(sv.rainMax)], Number(sv.scaleCount))}
            tickFormatter={(value) => Number.isInteger(value) ? value : value.toFixed(1)}     //小数点があれば1桁まで表示          
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
            dot={{ r: Number(sv.dotSize) }}
            stroke={`${sv.lineColor}`} 
            strokeWidth={Number(sv.lineWidth)}/>
          <Bar 
            yAxisId={2}
            dataKey="rain"
            barSize={50}
            fill={`${sv.barFillColor}`}
            stroke={`${sv.barOutlineColor}`}
            strokeWidth={ sv.barOutlineWidth }
            />
          <Tooltip />
          <text x={Number(sv.layoutWidth) / 2} y={Number(sv.layoutHeight)-40} fill="black" textAnchor="middle" dominantBaseline="central">
              <tspan fontSize="16">年平均気温: {annualAveTemp.toFixed(1)}°C，年間降水量: {annualRain.toFixed(1)}mm </tspan>
          </text>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
