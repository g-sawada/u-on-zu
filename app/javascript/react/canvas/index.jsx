import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
// import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Graph from './components/graph/graph';
import BottomDrawer from './components/bottom_drawer';
import GraphSettings from './components/graph_settings/graph_settings';
import DownloadImageButton from './components/download_image/download_image_button';
import MyGraphModal from './components/create_mygraph/mygraph_modal';
import { useGraph } from './hooks/useGraph';
import { checkLoggedIn } from './hooks/checkLoggedIn';

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
    height: '100vh',
  }),
);

export default function CanvasApp() {
  // 右ドロワーのstateとハンドラを宣言
  const [openRightDrawer, setOpenRightDrawer] = useState(true); //⭐falseに戻す！
  const handleRightDrawer = () => { openRightDrawer ? setOpenRightDrawer(false) : setOpenRightDrawer(true) }

  // 画像DLモーダルのstateとハンドラ
  const [openDLImageModal, setOpenDLImageModal] = useState(false);
  const handleOpenDLImageModal = () => setOpenDLImageModal(true);
  const handleCloseDLImageModal = () => setOpenDLImageModal(false);

  // マイグラフ登録モーダルのstateとハンドラ
  const [openMyGraphModal, setOpenMyGraphModal] = useState(false);
  const handleOpenMyGraphModal = () => setOpenMyGraphModal(true);
  const handleCloseMyGraphModal = () => setOpenMyGraphModal(false);

  // 下ドロワーのstateとハンドラ
  const [openBottomDrawer, setOpenBottomDrawer] = useState(false);
  const handleOpenBottomDrawer = () => setOpenBottomDrawer(true);
  const handleCloseBottomDrawer = () => setOpenBottomDrawer(false);

  // GraphSettingsのstateとハンドラを宣言
  //GraphSettingsのstate値をまとめて初期化。GraphやTemplateを取得した場合は，useEffectで更新する
  const [settingValues, setSettingValues] = useState({
    lineColor: '#FF0000',                  //線の色
    lineWidth: 1.5,                          //線の太さ
    dotOutlineColor: '#FF0000',            //ドットの外枠の色
    dotFillColor: '#FFFFFF',               //ドットの塗りつぶしの色
    dotSize: 4,                            //ドットのサイズ
    dotOutlineWidth: 1,                    //ドットの外枠の太さ
    tempMax: 40,                           //気温の目盛り最大値
    tempMin: -30,                          //気温の目盛り最小値
    scaleCount: 8,                         //目盛りの数（棒グラフと共通）
    tempYAxisFontSize: 16,                 //Y軸目盛りのフォントサイズ
    tempYAxisFontColor: '#000000',         //Y軸目盛りのフォントカラー
    tempYAxisLineWidth: 1,                 //Y軸の線の太さ
    tempYAxisLineColor: '#000000',         //Y軸の線のカラー

    barFillColor: '#00FFFF',               //棒グラフの塗りつぶしの色
    barOutlineColor: '#000000',            //棒グラフの外枠の色
    barBinWidth: 30,                       //棒グラフの幅
    barOutlineWidth: 1,                    //棒グラフの外枠の太さ
    rainMax: 700,                          //降水量の目盛り最大値
    rainYAxisFontSize: 16,                 //Y軸目盛りのフォントサイズ
    rainYAxisFontColor: '#000000',         //Y軸目盛りのフォントカラー
    rainYAxisLineWidth: 1,                 //Y軸の線の太さ
    rainYAxisLineColor: '#000000',         //Y軸の線のカラー

    xAxisFontSize: 12,                     //X軸目盛りのフォントサイズ
    xAxisFontColor: '#000000',             //X軸目盛りのフォントカラー
    xAxisLineWidth: 1,                     //X軸の線の太さ
    xAxisLineColor: '#000000',             //X軸の線のカラー

    title: '東京',                          //グラフタイトル
    titleFontSize: 24,                     //グラフタイトルのフォントサイズ
    titleFontColor: '#000000',             //グラフタイトルのフォントカラー

    layoutHeight: 500,                     //グラフの高さ
    layoutWidth: 500,                      //グラフの幅
    marginTop: 50,                         //グラフの上マージン
    marginBottom: 60,                      //グラフの下マージン
    marginLeft: 20,                        //グラフの左マージン
    marginRight: 20,                       //グラフの右マージン
    backgroundColor: '#FFFFFF',            //グラフの背景色
    fontfamily: 'sans-serif',              //フォントファミリー
  });

  //GraphSettingsコンポーネントに渡す設定値更新ハンドラ（対象のみ更新する）
  const handleValueChange = (name, value) => {
    setSettingValues({...settingValues, [name]: value});
  }

  //ログイン状態をチェック
  const { loggedIn, loginCheckLoading } = checkLoggedIn();

  const url = new URL(window.location.href);      // 現在のURLを取得
  const params = new URLSearchParams(url.search);    // URLSearchParamsオブジェクトを取得
  const graphParam = params.get('graph');     // グラフパラメータを取得

  const { graph, graphLoading } = useGraph(graphParam, loginCheckLoading, loggedIn);  
  
  useEffect(() => {
    console.log('こちらはindexのuseEffectです。loggedIn: ', loggedIn, 'loginCheckLoading: ', loginCheckLoading, 'graph: ', graph,  'graphLoading: ', graphLoading)
    if (graph && graph.graph_setting) {
      setSettingValues(graph.graph_setting.settings);
    }
  }, [graph, graphLoading]);

  if ( loginCheckLoading || graphLoading) {
    console.log('show loading')
    return <div className='m-20.text-3xl'>loading...</div>
  }

  return (
    <>
      {/* <div>{ loggedIn ? 'あああああ' : 'いいいいい' }</div> */}
      {/* 操作メニューバー */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button onClick={handleOpenDLImageModal}>画像DL</Button>
          <Button onClick={handleOpenMyGraphModal}>マイグラフ保存</Button>
          <Button onClick={handleOpenBottomDrawer}> 都市データ </Button>
          <Button onClick={handleRightDrawer} >  settings  </Button>
        </ButtonGroup>
      </Box>

        {/* 画像DLモーダル */}
        <DownloadImageButton 
          layoutHeight={settingValues.layoutHeight}  
          layoutWidth={settingValues.layoutWidth}
          graphTitle={settingValues.title}
          open={openDLImageModal}
          handleClose={handleCloseDLImageModal}
        />

        {/* マイグラフ登録モーダル */}
        <MyGraphModal 
          // graphSetting={{dotSize: lineDotSize}}
          graphSetting={settingValues}
          open={openMyGraphModal}
          handleClose={handleCloseMyGraphModal} />

      {/* グラフ描画と右ドロワーをラップしたBox */}
      <Box sx={{ display: 'flex' }} className='bg-red-200'>

        {/* open時に右ドロワーの幅だけ縮むMain描画部分 */}
        <Main open={openRightDrawer} >

          {/* <div className='text-xl'> {graph.graph_setting.settings.dotSize} </div>
          <div className='text-xl'> {JSON.stringify(graph.graph_setting)} </div> */}

          {/* Rechartsグラフ描画部分 */}
          <div className='flex justify-center items-center bg-blue-200'>
            <Graph sv={settingValues}/>
          </div>
        </Main>

        {/* 右ドロワー */}
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
              backgroundColor: "#f5f5f5",
              display: "flex",
              // padding: "20px",
              alignItems: "center",
            }
          }}
          // className={[classes.drawer, 'text-3xl']}
          variant="persistent"
          anchor="right"
          open={openRightDrawer}
        > 

          {/* グラフ設定値入力コンポーネント */}
          <GraphSettings settingValues={settingValues} handleValueChange={handleValueChange}/>
          {/* <div className='my-10'>ここはGraphSettingsの外（mainコンポーネント） {lineDotSize}</div> */}
        </Drawer>
      </Box>

      {/* 下ドロワー */}
      <BottomDrawer open={openBottomDrawer} handleClose={handleCloseBottomDrawer}/>
      {/* <div>ここにImage</div>
      <img alt="" id="output" /> */}
    </>
  );
}