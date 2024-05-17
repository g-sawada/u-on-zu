import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';


export default function GraphSettings({ lineDotSize, handleValueChange }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
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

      <div>
        <Accordion 
          expanded={expanded === 'panel1'} 
          onChange={handleChange('panel1')} 
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
            <div font-3xl> レイアウト </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{marginLeft: '10px' }}>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        {/* ここから2つめ */}
        <Accordion 
          expanded={expanded === 'panel2'} 
          onChange={handleChange('panel2')} 
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





        {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              You are currently not an owner
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
              varius pulvinar diam eros in elit. Pellentesque convallis laoreet
              laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Advanced settings
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Filtering has been entirely disabled for whole web server
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </div>
    </div>
  )
}