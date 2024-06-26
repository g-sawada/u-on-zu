import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export default function WrappedAccordion({ 
  expanded, //親コンポーネントのstate。開いているパネルの名前が入る 
  panel,    //このアコーディオンのpanel名（ユニークな名前にする）
  title,    //アコーディオンのタイトル
  children, handleChange }) {
  return (
    <Accordion
      expanded={expanded === panel} 
      onChange={handleChange(panel)} //親コントローラーのhandleExpandChangeを呼び出す
      disableGutters={true}          //開いた時のギャップをなくす
      elevation={0}                  //影をなくす
      sx={{
        '&.MuiAccordion-root': {
          borderRadius: 0,
          // backgroundColor: 'limegreen',
          backgroundColor: '#f5f5f5',
        },
      }} >
      <AccordionSummary
        aria-controls= {`${panel}bh-content`}
        id={`${panel}bh-header`}
        sx={{ 
          backgroundColor: '#d1cccc',
          boxShadow: "0px 2px 3px 0px rgba(0,0,0,0.4)",
        }}
        >

        {/* ここにタイトル */}
        <div className="text-md font-semibold text-gray-800">{title}</div>
      
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 60px', gap: '12px', marginTop: '15px' }}>
          
          {/* ここに中身が入る */}
          { children }

        </div>
      </AccordionDetails>
    </Accordion>
  )
}
