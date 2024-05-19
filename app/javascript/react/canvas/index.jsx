import React from 'react';
import Graph from './components/graph/graph';
import MainWithRightDrawer from './components/main_with_right_drawer';
import BottomDrawer from './components/bottom_drawer';
import { useGraph } from './hooks/useGraph';
import MyGraphModal from './components/create_mygraph/mygraph_modal';

export default function CanvasApp() {
  const { graph, setGraph, loading } = useGraph();
  console.log('Graph Data from Backend!', graph);
  
  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div className=''>
      <div className='text-xl'> {graph.graph.title} </div>
      <div className='text-xl'> {JSON.stringify(graph.graph_setting)} </div>
      <MyGraphModal />
      <MainWithRightDrawer />
      <BottomDrawer />      
    </div>
  )
}