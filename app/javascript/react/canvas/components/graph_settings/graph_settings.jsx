import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import WrappedAccordion from "./wrapped_accordion";


export default function GraphSettings({ lineDotSize, handleValueChange }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


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
      <WrappedAccordion panel='panel3' title='test!' children expanded={expanded} handleChange={handleExpandChange} >
        <div>なかみ！</div>
      </ WrappedAccordion>

      <WrappedAccordion panel='panel4' title='test2!' children expanded={expanded} handleChange={handleExpandChange} >
        <div>なかみ２！</div>
      </ WrappedAccordion>

      <Accordion 
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
          // expandIcon={<ExpandMoreIcon />}
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
      </Accordion>
      
      {/* ここから2つめ */}
      <Accordion 
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
          // expandIcon={<ExpandMoreIcon />}
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
      </Accordion>
    </div>
  )
}