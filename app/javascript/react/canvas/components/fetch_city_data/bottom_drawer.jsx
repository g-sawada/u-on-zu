import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CitySearchBox from './city_search_box';
import GoogleMapComponent from './googlemap_component';

// TabsとTabPanelのスタイルを定義
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'relative', // ルートは親要素に対して相対位置
  },
  tabs: {
    position: 'absolute', // タブ選択部分は絶対位置
    top: 0,
    left: 0,
    zIndex: 1,
  },
  tabpanels: {
    position: 'relative', // タブコンテンツ部分は相対位置
  },
}));

// インジケーターのスタイル
// const tabSx = {
//   '& .MuiTabs-indicator': {
//     backgroundColor: 'red',
//   },
// };


export default function BottomDrawer({open, handleClose, bottomDrawerButtonRef, setCityId}) {
  // ドロワーの状態，ドロワー閉ハンドラ，下ドロワー起動ボタンのref，setCityId関数

  // ClickAwayListenerで指定する，ドロワー外をクリックした時の処理
  const handleClickAway = (event) => {
    //index.jsxから引き受けたRefを使って，起動ボタンをクリックした時はhandleCloseを実行しないようにする
    if (bottomDrawerButtonRef.current && bottomDrawerButtonRef.current.contains(event.target)) {
      return;
    }
    handleClose();
  }

  const classes = useStyles();

  //選択中のタブのインデックスを保持するステート
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  //タブの変更ハンドラ
  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };
  
  // モックデータ
  const cityIdMapping = [
    { id: 1, name: '東京', position: { lat: 35.6917, lng: 139.75, alt: 25.2 }},
    { id: 2, name: '大阪', position: { lat: 34.6817, lng: 135.5183, alt: 23.0 }},
    { id: 3, name: '札幌', position: { lat: 43.06, lng: 141.3283, alt: 17.4 }},
    { id: 4, name: '那覇', position: { lat: 26.2067, lng: 127.6867, alt: 28.1 }},
    ]

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Drawer
        variant='persistent'
        anchor='bottom'
        open={open}
        // onClose={handleClose}
      >        
        <div className={classes.root}>
          <div className={classes.tabs}>
            <AppBar position="static" style={{backgroundColor: '#b9b1b1'}}>
              <Tabs 
                value={selectedTabIndex}
                onChange={handleTabChange}
                aria-label="simple tabs example"
                sx={{  
                      '& .MuiTabs-indicator': {    //インジケーターのスタイル⭐
                        backgroundColor: '#5a7c65',
                        height: '5px',
                      }
                    }}
              >
                <Tab label="検索" {...a11yProps(0)} 
                  style={{ color: 'black', fontSize: '16px', fontWeight: 'bold', width: '100px'}}
                  // sx={tabSx}
                  />
                <Tab label="地図" {...a11yProps(1)}
                  style={{ color: 'black', fontSize: '16px', fontWeight: 'bold', width: '100px'}}/>
                {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
              </Tabs>
            </AppBar>
          </div>
          <div className={classes.tabpanels}>

            <TabPanel selected={selectedTabIndex} index={0}>
              {/* カラムから呼び出し */}
              <CitySearchBox cityIdMapping={cityIdMapping} setCityId={setCityId}/>
            </TabPanel>
            
            <TabPanel selected={selectedTabIndex} index={1}>
              {/* GoogleMapから呼び出し */}
              <GoogleMapComponent cityIdMapping={cityIdMapping} setCityId={setCityId}/>
            </TabPanel>

            {/* <TabPanel selected={selectedTabIndex} index={2}>
            </TabPanel> */}
          </div>
        </div>
      </Drawer>
    </ClickAwayListener>
  );
}


// ここからタブ関連のコンポーネントや関数
function TabPanel(props) {
  const { children, selected, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selected !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{width: '100%', height: '35vh'}}
      {...other}
    >
      {selected === index && (
        <Box height='100%' sx={{borderTop: 3, borderColor: '#b9b1b1'}}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}