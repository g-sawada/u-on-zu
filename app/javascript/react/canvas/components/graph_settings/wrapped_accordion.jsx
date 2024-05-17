import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export default function WrappedAccordion({ expanded, panel, title, children, handleChange }) {

  return (
    <>
      <Accordion
        expanded={expanded === panel} 
        onChange={handleChange(panel)} 
        disableGutters={true}
        elevation={0}
        sx={{
          '&.MuiAccordion-root': {
            borderRadius: 0,
            backgroundColor: 'limegreen',
          },
        }} >
        <AccordionSummary
          aria-controls= {`${panel}bh-content`}
          id={`${panel}bh-header`}
          sx={{ backgroundColor: 'darkgreen'}}
          >
          <div font-3xl>{title}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 100px', gap: '10px' }}>
            { children }
          </div>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion 
      //   expanded={expanded === panel} 
      //   // onChange={handleChange(panel)} 
      //   disableGutters={true} //開いた時のギャップをなくす
      //   elevation={0} //影をなくす
      //   sx={{
      //     '&.MuiAccordion-root': {
      //       borderRadius: 0,
      //       backgroundColor: 'limegreen',
      //     },
      //   }} >
      //   <AccordionSummary  //アコーディオンのヘッダー
      //     // expandIcon={<ExpandMoreIcon />}
      //     aria-controls= {`${panel}bh-content`}
      //     id={`${panel}bh-header`}
      //     sx={{ backgroundColor: 'darkgreen'}}
      //     >
      //     <div font-3xl>{title}</div>
      //   </AccordionSummary>
      //   <AccordionDetails>
      //     <div style={{ display: 'grid', gridTemplateColumns: 'auto 100px', gap: '10px' }}>
      //       { children }
      //     </div>
      //   </AccordionDetails>
      // </Accordion> */}
    </>
  )
}
