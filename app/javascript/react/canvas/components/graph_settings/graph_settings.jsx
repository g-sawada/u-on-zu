import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import WrappedAccordion from "./wrapped_accordion";


export default function GraphSettings({ lineDotSize, handleValueChange }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const inputWidth = '60px';


  // const [lineDotSize, setLineDotSize] = useState(4);
  // const [barStrokeWidth, setBarStrokeWidth] = useState(1);
  // const [tempDomainMax, setTempDomainMax] = useState(40);

  // const handleChangeNumber = (setter) => (e) => {
  //   if (e.target.value !== '') {
  //     setter(Number(e.target.value));
  //   }
  //   console.log(e.target.value);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    handleValueChange(value);
  }

  return (
    <div className="container">
      <div id="input">
        <div>DotSize</div>
        <input 
          type='number' 
          step={0.5} 
          value={lineDotSize} 
          onChange={handleInputChange}/>
        <p>ここはGraphSettingsの中: {lineDotSize} </p>  
      </div>

      <div className="font-bold text-white">
        ここにリスト
      </div>
      <WrappedAccordion panel='temperature' title='気温（折れ線）' children expanded={expanded} handleChange={handleExpandChange} >
        <label htmlFor="lineColorInput">折れ線色</label>
        <input 
          id="lineColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="lineWidthInput">折れ線幅</label>
        <input 
          id="lineWidthInput"
          type='number'
          step={0.1} 
          value={0}
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="dotOutlineColorInput">ドット輪郭色</label>
        <input 
          id="dotOutlineColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="dotFillColorInput">ドット塗り色</label>
        <input 
          id="dotFillColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="dotSizeInput">ドットサイズ</label>
        <input 
          id="dotSizeInput"
          type='number'
          step={0.5} 
          value={lineDotSize}
          onChange={handleInputChange}
          style={{ width: inputWidth }}/>

        <label htmlFor="dotOutlineWidthInput">ドット輪郭幅</label>
        <input 
          id="dotOutlineWidthInput"
          type='number'
          step={0.1} 
          value={1}
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="tempMaxInput">目盛り最大値</label>
        <input 
        id="tempMaxInput"
        type='number'
        step={10} 
        value={40}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempMinInput">目盛り最小値</label>
        <input 
        id="tempMinInput"
        type='number'
        step={10} 
        value={-30}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempScaleCountInput">目盛り線の数</label>
        <input 
        id="tempScaleCountInput"
        type='number'
        step={1} 
        value={8}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempYAxisFontSizeInput">目盛り文字サイズ</label>
        <input 
        id="tempYAxisFontSizeInput"
        type='number'
        step={1} 
        value={12}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempYAxisFontColorInput">目盛り文字色</label>
        <input 
          id="tempYAxisFontColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="tempYAxisLineWidthInput">縦軸線幅</label>
        <input 
        id="tempYAxisLineWidthInput"
        type='number'
        step={0.1} 
        value={0.5}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempYAxisLineColorInput">縦軸線色</label>
        <input 
          id="tempYAxisLineColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>
      </ WrappedAccordion>

      <WrappedAccordion panel='rainfall' title='降水量（棒）' children expanded={expanded} handleChange={handleExpandChange} >
        <label htmlFor="barFillColorInput">塗り色</label>
        <input 
          id="barFillColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="barOutlineColorInput">輪郭色</label>
        <input 
          id="barOutlineColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="lineWidthInput">棒幅</label>
        <input 
          id="lineWidthInput"
          type='number'
          step={5} 
          value={30}
          onChange={""}
          style={{ width: inputWidth }}/>

        
        <label htmlFor="barOutlineWidthInput">輪郭幅</label>
        <input 
          id="barOutlineWidthInput"
          type='number'
          step={0.1} 
          value={1}
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="rainMaxInput">目盛り最大値</label>
        <input 
        id="tempMaxInput"
        type='number'
        step={50} 
        value={700}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="rainScaleCountInput">目盛り線の数</label>
        <input 
        id="rainScaleCountInput"
        type='number'
        step={1} 
        value={8}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="rainYAxisFontSizeInput">目盛り文字サイズ</label>
        <input 
        id="rainYAxisFontSizeInput"
        type='number'
        step={1} 
        value={12}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="rainYAxisFontColorInput">目盛り文字色</label>
        <input 
          id="rainYAxisFontColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="rainYAxisLineWidthInput">縦軸線幅</label>
        <input 
        id="rainYAxisLineWidthInput"
        type='number'
        step={0.1} 
        value={0.5}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="rainYAxisLineColorInput">縦軸線色</label>
        <input 
          id="rainYAxisLineColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>
      </WrappedAccordion>

      <WrappedAccordion panel='month' title='横軸（月）' children expanded={expanded} handleChange={handleExpandChange} >
      <label htmlFor="xAxisFontSizeInput">文字サイズ</label>
        <input 
        id="xAxisFontSizeInput"
        type='number'
        step={1} 
        value={12}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="xAxisFontColorInput">文字色</label>
        <input 
          id="xAxisFontColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="xAxisLineWidthInput">軸線幅</label>
        <input 
        id="xAxisLineWidthInput"
        type='number'
        step={0.1} 
        value={0.5}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="xAxisLineColorInput">軸線色</label>
        <input 
          id="xAxisLineColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>
      </WrappedAccordion>

      <WrappedAccordion panel='title' title='タイトル' children expanded={expanded} handleChange={handleExpandChange} >
        <label htmlFor="titleFontSizeInput">文字サイズ</label>
        <input 
        id="titleFontSizeInput"
        type='number'
        step={1} 
        value={12}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="titleFontColorInput">文字色</label>
        <input 
          id="titleFontColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>
      </WrappedAccordion>

      <WrappedAccordion panel='layout' title='レイアウト' children expanded={expanded} handleChange={handleExpandChange} >
      <label htmlFor="layoutHeightInput">縦幅</label>
        <input 
        id="layoutHeightInput"
        type='number'
        step={10} 
        value={500}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="layoutWidthInput">横幅</label>
        <input 
        id="layoutHeightInput"
        type='number'
        step={10} 
        value={500}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="marginTopInput">上余白</label>
        <input 
        id="marginTopInput"
        type='number'
        step={5} 
        value={50}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="marginBottomInput">下余白</label>
        <input 
        id="marginBottomInput"
        type='number'
        step={5} 
        value={60}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="marginLeftInput">左余白</label>
        <input 
        id="marginLeftInput"
        type='number'
        step={5} 
        value={20}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="marginRightInput">右余白</label>
        <input 
        id="marginRightInput"
        type='number'
        step={5} 
        value={20}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="marginTopInput">上余白</label>
        <input 
        id="marginTopInput"
        type='number'
        step={5} 
        value={50}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="backgroundColorInput">背景色</label>
        <input 
          id="backgroundColorInput"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>
        
        <label htmlFor="fontfamilySelect">文字フォント</label>
        <select 
          id="fontfamilySelect"
          onChange={""}
          style={{ width: '100px', justifySelf: 'end' }}>
          <option value="sans-serif">ゴシック体</option>
          <option value="serif">明朝体</option>
        </select>
      </ WrappedAccordion>
    </div>
  )
}