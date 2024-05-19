import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Graph from './graph/graph';
import GraphSettings from './graph_settings/graph_settings';
import DownloadImageButton from './download_image/download_image_button';
import MyGraphModal from './create_mygraph/mygraph_modal';


const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: 'relative',
  }),
);

export default function MainWithRightDrawer() {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // GraphSettingsのstateとハンドラを宣言
  const [lineDotSize, setLineDotSize] = useState(4);

  const handleValueChange = (value) => {
    if (value !== '') {
      setLineDotSize(Number(value));
    }
  }


  return (
    <Box sx={{ display: 'flex' }} className='bg-red-200'>
      <Main open={open}>
        <button onClick={handleDrawerOpen} className='btn btn-info'>Right</button>
        
        <MyGraphModal graphSetting={{dotSize: lineDotSize}}/>

        <DownloadImageButton />        

        {/* ここにグラフ */}
        <div className='flex justify-center items-center bg-blue-200'>
          <Graph lineDotSize={lineDotSize}/>
        </div>

      </Main>
      <Drawer
        sx={{
          position: 'relative',
          marginLeft: "auto",
          width: drawerWidth,
          "& .MuiBackdrop-root": {
            display: "none"
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height: "100%",
            position: "absolute",
            backgroundColor: "limegreen",
            display: "flex",
            padding: "20px",
            alignItems: "center",
          }
        }}
        // className={[classes.drawer, 'text-3xl']}
        variant="persistent"
        anchor="right"
        open={open}
      > 
        {/* ここからDrawerの中身 */}
        <div>
          <div onClick={handleDrawerClose} className='btn btn-primary'>Close</div>
        </div>

        {/* ここにグラフ設定値入力コンポーネント */}
        <GraphSettings lineDotSize={lineDotSize} handleValueChange={handleValueChange}/>
        {/* <div className='my-10'>ここはGraphSettingsの外（mainコンポーネント） {lineDotSize}</div> */}

      </Drawer>
    </Box>
  );
}