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

        <label htmlFor="tempMaxValue">目盛り最大値</label>
        <input 
        id="tempMaxValue"
        type='number'
        step={10} 
        value={30}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempMinValue">目盛り最小値</label>
        <input 
        id="tempMinValue"
        type='number'
        step={10} 
        value={-30}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempScaleCount">目盛り線の数</label>
        <input 
        id="tempScaleCount"
        type='number'
        step={1} 
        value={8}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempYAxisFontSize">目盛り文字サイズ</label>
        <input 
        id="tempYAxisFontSize"
        type='number'
        step={1} 
        value={12}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempYAxisFontColor">目盛り文字色</label>
        <input 
          id="tempYAxisFontColor"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>

        <label htmlFor="tempYAxisLineWidth">縦軸線幅</label>
        <input 
        id="tempYAxisLineWidth"
        type='number'
        step={0.1} 
        value={0.5}
        onChange={""}
        style={{ width: inputWidth }}/>

        <label htmlFor="tempYAxisLineColor">縦軸線幅</label>
        <input 
          id="tempYAxisLineColor"
          type='color' 
          value={''} 
          onChange={""}
          style={{ width: inputWidth }}/>
      </ WrappedAccordion>

      <WrappedAccordion panel='layout' title='レイアウト' children expanded={expanded} handleChange={handleExpandChange} >
        <label htmlFor="dotSizeInput">DotSize</label>
        <input 
          id="dotSizeInput"
          type='number' 
          step={0.5} 
          value={lineDotSize} 
          onChange={handleInputChange}
          style={{ width: inputWidth }}/>

        <label htmlFor="dotSizeInput">DotSize</label>
        <input 
          id="dotSizeInput"
          type='number' 
          step={0.5} 
          value={lineDotSize} 
          onChange={handleInputChange}
          style={{ width: inputWidth }}/>
      </ WrappedAccordion>



      {/* <Accordion 
        expanded={expanded === 'panel1'} 
        onChange={handleExpandChange('panel1')} 
        disableGutters={true} //開いた時のギャップをなくす
        elevation={0} //影をなくす
        sx={{
          '&.MuiAccordion-root': {
            borderRadius: 0,
            backgroundColor: 'limegreen',
          },
        }} >
        <AccordionSummary  //アコーディオンのヘッダー
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ backgroundColor: 'darkgreen'}}

          >
          <div font-3xl> レイアウト </div>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 100px', gap: '10px' }}>
            <label htmlFor="dotSizeInput">DotSize</label>
            <input 
              id="dotSizeInput"
              type='number' 
              step={0.5} 
              value={lineDotSize} 
              onChange={handleInputChange}
              style={{ width: '100px' }}/>
          </div>
        </AccordionDetails>
      </Accordion> */}
      
      {/* ここから2つめ */}
      {/* <Accordion 
        expanded={expanded === 'panel2'} 
        onChange={handleExpandChange('panel2')} 
        disableGutters={true} //開いた時のギャップをなくす
        elevation={0} //影をなくす
        sx={{
          '&.MuiAccordion-root': {
            borderRadius: 0,
            backgroundColor: 'limegreen',
          },
        }} >
        <AccordionSummary  //アコーディオンのヘッダー
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          sx={{ backgroundColor: 'darkgreen'}}

          >
          <div font-3xl> 気温（折れ線） </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{marginLeft: '10px' }}>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  )
}