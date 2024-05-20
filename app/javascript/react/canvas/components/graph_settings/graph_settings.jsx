import React, { useState } from "react";

import WrappedAccordion from "./wrapped_accordion";
import { ValueInput, ColorInput } from "./color_value_input";


export default function GraphSettings({ settingValues, handleValueChange }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const inputWidth = '60px';
  
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleValueChange(name, value);
  }

  return (
    <div className="container">
      {/* -------------- 気温（折れ線）-------------- */}
      <WrappedAccordion panel='temperature' title='気温（折れ線）' children expanded={expanded} handleChange={handleExpandChange} >
        <ColorInput name='lineColor' label='折れ線色' value={settingValues.lineColor} onChange={handleInputChange} />
        <ValueInput name='lineWidth' label='折れ線幅' value={settingValues.lineWidth} step={0.1} onChange={handleInputChange}/>
        {/* <ColorInput name='dotOutlineColor' label='ドット輪郭色' value={settingValues.dotOutlineColor} onChange={handleInputChange} /> */}
        {/* <ColorInput name='dotFillColor' label='ドット塗り色' value={settingValues.dotFillColor} onChange={handleInputChange} /> */}
        <ValueInput name='dotSize' label='ドットサイズ' value={settingValues.dotSize} step={0.5} onChange={handleInputChange}/>
        {/* <ValueInput name='dotOutlineWidth' label='ドット輪郭幅' value={settingValues.dotOutlineWidth} step={0.1} onChange={handleInputChange}/> */}
        <ValueInput name='tempMax' label='目盛り最大値' value={settingValues.tempMax} step={10} onChange={handleInputChange}/>
        <ValueInput name='tempMin' label='目盛り最小値' value={settingValues.tempMin} step={10} onChange={handleInputChange}/>
        <ValueInput name='scaleCount' label='目盛り線の数(共通)' value={settingValues.scaleCount} step={1} onChange={handleInputChange}/>
        {/* tempScaleCountとrainScaleCountは現在共通なので注意 */}
        {/* <ValueInput name='tempYAxisFontSize' label='目盛り文字サイズ' value={settingValues.tempYAxisFontSize} step={1} onChange={handleInputChange}/> */}
        {/* <ColorInput name='tempYAxisFontColor' label='目盛り文字色' value={settingValues.tempYAxisFontColor} onChange={handleInputChange} /> */}
        {/* <ValueInput name='tempYAxisLineWidth' label='縦軸線幅' value={settingValues.tempYAxisLineWidth} step={0.1} onChange={handleInputChange}/> */}
        {/* <ColorInput name='tempYAxisLineColor' label='縦軸線色' value={settingValues.tempYAxisLineColor} onChange={handleInputChange} /> */}
      </ WrappedAccordion>

      {/* -------------- 降水量（棒）-------------- */}
      <WrappedAccordion panel='rainfall' title='降水量（棒）' children expanded={expanded} handleChange={handleExpandChange} >
        <ColorInput name='barFillColor' label='塗り色' value={settingValues.barFillColor} onChange={handleInputChange} />
        <ColorInput name='barOutlineColor' label='輪郭色' value={settingValues.barOutlineColor} onChange={handleInputChange} />
        <ValueInput name='barBinWidth' label='棒幅' value={settingValues.barBinWidth} step={5} onChange={handleInputChange}/>
        <ValueInput name='barOutlineWidth' label='輪郭幅' value={settingValues.barOutlineWidth} step={0.1} onChange={handleInputChange}/>
        <ValueInput name='rainMax' label='目盛り最大値' value={settingValues.rainMax} step={50} onChange={handleInputChange}/>
        <ValueInput name='scaleCount' label='目盛り線の数(共通)' value={settingValues.scaleCount} step={1} onChange={handleInputChange}/>
        {/* tempScaleCountとrainScaleCountは現在共通なので注意 */}
        {/* <ValueInput name='rainYAxisFontSize' label='目盛り文字サイズ' value={settingValues.rainYAxisFontSize} step={1} onChange={handleInputChange}/> */}
        {/* <ColorInput name='rainYAxisFontColor' label='目盛り文字色' value={settingValues.rainYAxisFontColor} onChange={handleInputChange} /> */}
        {/* <ValueInput name='rainYAxisLineWidth' label='縦軸線幅' value={settingValues.rainYAxisLineWidth} step={0.1} onChange={handleInputChange}/> */}
        {/* <ColorInput name='rainYAxisLineColor' label='縦軸線色' value={settingValues.rainYAxisLineColor} onChange={handleInputChange} /> */}
      </WrappedAccordion> 

      {/* -------------- 横軸（月）-------------- */}
      <WrappedAccordion panel='month' title='横軸（月）' children expanded={expanded} handleChange={handleExpandChange} >
        {/* <ValueInput name='xAxisFontSize' label='文字サイズ' value={settingValues.xAxisFontSize} step={1} onChange={handleInputChange}/> */}
        {/* <ColorInput name='xAxisFontColor' label='文字色' value={settingValues.xAxisFontColor} onChange={handleInputChange} /> */}
        <ValueInput name='xAxisLineWidth' label='軸線幅' value={settingValues.xAxisLineWidth} step={0.1} onChange={handleInputChange}/>
        {/* <ColorInput name='xAxisLineColor' label='軸線色' value={settingValues.xAxisLineColor} onChange={handleInputChange} /> */}
      </WrappedAccordion>

      {/* -------------- タイトル -------------- */}
      <WrappedAccordion panel='title' title='タイトル' children expanded={expanded} handleChange={handleExpandChange} >
        <label htmlFor={'titleInput'}>タイトル</label>
        <input
          name='title'
          id='titleInput'
          type='text' 
          value={settingValues.title}
          onChange={handleInputChange}
          style={{ width: '150px', justifySelf: 'end' }}/>
        <ValueInput name='titleFontSize' label='文字サイズ' value={settingValues.titleFontSize} step={1} onChange={handleInputChange}/>
        <ColorInput name='titleFontColor' label='文字色' value={settingValues.titleFontColor} onChange={handleInputChange} />
      </WrappedAccordion>

      {/* -------------- レイアウト -------------- */}
      <WrappedAccordion panel='layout' title='レイアウト' children expanded={expanded} handleChange={handleExpandChange} >
        <ValueInput name='layoutHeight' label='縦幅' value={settingValues.layoutHeight} step={10} onChange={handleInputChange}/>
        <ValueInput name='layoutWidth' label='横幅' value={settingValues.layoutWidth} step={10} onChange={handleInputChange}/>
        <ValueInput name='marginTop' label='上余白' value={settingValues.marginTop} step={1} onChange={handleInputChange}/>
        <ValueInput name='marginBottom' label='下余白' value={settingValues.marginBottom} step={1} onChange={handleInputChange}/>
        <ValueInput name='marginLeft' label='左余白' value={settingValues.marginLeft} step={1} onChange={handleInputChange}/>
        <ValueInput name='marginRight' label='右余白' value={settingValues.marginRight} step={1} onChange={handleInputChange}/>
        <ColorInput name='backgroundColor' label='背景色' value={settingValues.backgroundColor} onChange={handleInputChange} />
        
        <label htmlFor="fontfamilySelect">文字フォント</label>
        <select 
          id="fontfamilySelect"
          defaultValue={"sans-serif"}
          onChange={handleInputChange}
          style={{ width: '110px', justifySelf: 'end' }}>
          <option value="sans-serif">ゴシック体</option>
          <option value="serif">明朝体</option>
        </select>
      </ WrappedAccordion>
    </div>
  )
}