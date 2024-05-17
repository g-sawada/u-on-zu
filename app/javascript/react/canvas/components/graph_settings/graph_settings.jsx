import React, { useState } from "react";

export default function GraphSettings({ lineDotSize, handleValueChange }) {
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

    </div>
  )
}