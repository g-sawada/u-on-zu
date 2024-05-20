// import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import { makeStyles } from "@material-ui/core/styles";
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';

// import BottomDrawer from './bottom_drawer';
// import Graph from './graph/graph';
// import GraphSettings from './graph_settings/graph_settings';
// import DownloadImageButton from './download_image/download_image_button';
// import MyGraphModal from './create_mygraph/mygraph_modal';
// import { useGraph } from '../hooks/useGraph';

// const drawerWidth = 300;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginRight: -drawerWidth,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginRight: 0,
//     }),
//     /**
//      * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
//      * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
//      * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
//      * proper interaction with the underlying content.
//      */
//     position: 'relative',
//   }),
// );

// export default function MainWithRightDrawer() {
//   const { graph, setGraph, loading } = useGraph();

//   const [open, setOpen] = useState(true);
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   // GraphSettingsのstateとハンドラを宣言
//   const [lineDotSize, setLineDotSize] = useState(4); //useGraphでデータを取得するまでの初期値

//   const [settingValues, setSettingValues] = useState({
//     lineColor: '#FF0000',                  //線の色
//     lineWidth: 1.5,                          //線の太さ
//     dotOutlineColor: '#FF0000',            //ドットの外枠の色
//     dotFillColor: '#FFFFFF',               //ドットの塗りつぶしの色
//     dotSize: 4,                            //ドットのサイズ
//     dotOutlineWidth: 1,                    //ドットの外枠の太さ
//     tempMax: 40,                           //気温の目盛り最大値
//     tempMin: -30,                          //気温の目盛り最小値
//     scaleCount: 8,                         //目盛りの数（棒グラフと共通）
//     tempYAxisFontSize: 16,                 //Y軸目盛りのフォントサイズ
//     tempYAxisFontColor: '#000000',         //Y軸目盛りのフォントカラー
//     tempYAxisLineWidth: 1,                 //Y軸の線の太さ
//     tempYAxisLineColor: '#000000',         //Y軸の線のカラー

//     barFillColor: '#00FFFF',               //棒グラフの塗りつぶしの色
//     barOutlineColor: '#000000',            //棒グラフの外枠の色
//     barBinWidth: 30,                       //棒グラフの幅
//     barOutlineWidth: 1,                    //棒グラフの外枠の太さ
//     rainMax: 700,                          //降水量の目盛り最大値
//     rainYAxisFontSize: 16,                 //Y軸目盛りのフォントサイズ
//     rainYAxisFontColor: '#000000',         //Y軸目盛りのフォントカラー
//     rainYAxisLineWidth: 1,                 //Y軸の線の太さ
//     rainYAxisLineColor: '#000000',         //Y軸の線のカラー

//     xAxisFontSize: 12,                     //X軸目盛りのフォントサイズ
//     xAxisFontColor: '#000000',             //X軸目盛りのフォントカラー
//     xAxisLineWidth: 1,                     //X軸の線の太さ
//     xAxisLineColor: '#000000',             //X軸の線のカラー

//     title: '東京',                          //グラフタイトル
//     titleFontSize: 24,                     //グラフタイトルのフォントサイズ
//     titleFontColor: '#000000',             //グラフタイトルのフォントカラー

//     layoutHeight: 500,                     //グラフの高さ
//     layoutWidth: 500,                      //グラフの幅
//     marginTop: 50,                         //グラフの上マージン
//     marginBottom: 60,                      //グラフの下マージン
//     marginLeft: 20,                        //グラフの左マージン
//     marginRight: 20,                       //グラフの右マージン
//     backgroundColor: '#FFFFFF',            //グラフの背景色
//     fontfamily: 'sans-serif',              //フォントファミリー
//   });


//   //graphデータが取得できたら，state値を更新
//   useEffect(() => {
//     if (graph.graph_setting) {
//       setLineDotSize(graph.graph_setting.settings.dotSize);
//     }
//   }, [graph]);

//   //GraphSettingsコンポーネントに渡すハンドラ
//   const handleValueChange = (name, value) => {
//     setSettingValues({...settingValues, [name]: value});
//   }

//   // console.log('Graph Data from Backend!', graph);
//   // console.log('lineWidth :', settingValues.lineWidth);
//   console.log('fontFamily :', settingValues.fontfamily);
  
//   if (loading) {
//     return <div>loading...</div>
//   }

//   return (
//     <>
//       <Box sx={{ display: 'flex' }} className='bg-red-200'>
//         <Main open={open}>
          
//           <ButtonGroup variant="contained" aria-label="Basic button group">
//             <Button>
//               <DownloadImageButton 
//               layoutHeight={settingValues.layoutHeight}  
//               layoutWidth={settingValues.layoutWidth}
//               graphTitle={settingValues.title}
//               />
//             </Button>
//             <Button>
//               <MyGraphModal graphSetting={{dotSize: lineDotSize}}/>
//             </Button>
//             <Button>Three</Button>
//           </ButtonGroup>

//           <div className='join'>
//             <div>あああ</div>
//             <button class="btn join-item">Button</button>
//             <button class="btn join-item">Button</button>
//             <button onClick={handleDrawerOpen} className='btn btn-info join-item'>Right</button>
//           </div>


          


//           {/* <div className='text-xl'> {graph.graph_setting.settings.dotSize} </div>
//           <div className='text-xl'> {JSON.stringify(graph.graph_setting)} </div> */}

//           {/* ここにグラフ */}
//           <div className='flex justify-center items-center bg-blue-200'>
//             <Graph sv={settingValues}/>
//           </div>

//         </Main>
//         <Drawer
//           sx={{
//             position: 'relative',
//             marginLeft: "auto",
//             width: drawerWidth,
//             "& .MuiBackdrop-root": {
//               display: "none"
//             },
//             "& .MuiDrawer-paper": {
//               width: drawerWidth,
//               height: "100%",
//               position: "absolute",
//               backgroundColor: "limegreen",
//               display: "flex",
//               padding: "20px",
//               alignItems: "center",
//             }
//           }}
//           // className={[classes.drawer, 'text-3xl']}
//           variant="persistent"
//           anchor="right"
//           open={open}
//         > 
//           {/* ここからDrawerの中身 */}
//           <div>
//             <div onClick={handleDrawerClose} className='btn btn-primary'>Close</div>
//           </div>

//           {/* ここにグラフ設定値入力コンポーネント */}
//           <GraphSettings settingValues={settingValues} handleValueChange={handleValueChange}/>
//           {/* <div className='my-10'>ここはGraphSettingsの外（mainコンポーネント） {lineDotSize}</div> */}

//         </Drawer>
//       </Box>
//       <BottomDrawer />      
//     </>
//   );
// }