import React from "react";
import Graph from '../canvas/components/graph/graph';


export default function MyGraphApp() {
  return (
    <div className='flex justify-center items-center'>
      <Graph data={graphInput} sv={settingValues}/>
    </div>
  )
}