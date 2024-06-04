import React, { useState, useEffect, useRef } from 'react';

import { styled } from '@mui/material/styles';
// import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';

import { Select, MenuItem, FormControl, InputLabel, Tooltip } from '@mui/material';

import { MdAddChart } from "react-icons/md";
import { FaEarthAsia } from "react-icons/fa6";
import { AiOutlinePicture, AiOutlineControl } from "react-icons/ai";
import { HiChevronDoubleRight } from "react-icons/hi";


import { initialSettingValues } from './initialSettingValues';
import Graph from './components/graph/graph';
import BottomDrawer from './components/fetch_city_data/bottom_drawer';
import GraphSettings from './components/graph_settings/graph_settings';
import DownloadImageButton from './components/download_image/download_image_modal';
import MyGraphModal from './components/create_mygraph/mygraph_modal';
import MyTemplateModal from './components/create_mytemplate/mytemplate_modal';
import { checkLoggedIn } from './hooks/checkLoggedIn';
import { useGraph } from './hooks/useGraph';
import { useCity } from './hooks/useCity';

import { data_tokyo } from './components/graph/tokyo';
import { reshapeData } from './components/graph/reshapeData';
import { getTemplateList } from './hooks/getTemplateList';

import { updateByTemplate } from './components/fetch_template/updateByTemplate';



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
  // モーダルと下ドロワーの開閉stateを共通化するカスタムフック
  const useModalDrawerState = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => { 
      setIsOpen(true);
    }
    const handleClose = () => {
      setIsOpen(false);
    }
    return [ isOpen, handleOpen, handleClose ];
  }

  // 画像DLモーダルのstateとハンドラ
  const [openDLImageModal, handleOpenDLImageModal, handleCloseDLImageModal] = useModalDrawerState();
  // マイグラフ登録モーダルのstateとハンドラ
  const [openMyGraphModal, handleOpenMyGraphModal, handleCloseMyGraphModal] = useModalDrawerState();
  // マイテンプレート登録モーダルのstateとハンドラ
  const [openMyTemplateModal, handleOpenMyTemplateModal, handleCloseMyTemplateModal] = useModalDrawerState();
  // 下ドロワーのstateとハンドラ
  const [openBottomDrawer, handleOpenBottomDrawer, handleCloseBottomDrawer] = useModalDrawerState();
   // 下ドロワーのトグル化
  const toggleBottomDrawer = () => {
    openBottomDrawer ? handleCloseBottomDrawer() : handleOpenBottomDrawer()
  }
  //右ドロワーのstateとハンドラ
  const [openRightDrawer, handleOpenRightDrawer, handleCloseRightDrawer] = useModalDrawerState();
  //右ドロワーのトグル化
  const toggleRightDrawer = () => {
    openRightDrawer ? handleCloseRightDrawer() : handleOpenRightDrawer()
  }

  //都市IDをstateで管理。初期値は1（東京）
  const [cityId, setCityId] = useState(1); 

  //グラフに投入するデータをstateで管理。初期値はcityIdのfetchエラーを想定して東京のモックデータにしておく。
  const [graphInput, setGraphInput] = useState(data_tokyo);

  //テンプレート一覧の選択肢をstateで管理。初期値は空の配列で，未ログインなら更新しない。
  const [templateOptions, setTemplateOptions] = useState([])

  // 選択中のテンプレートをstateで管理
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  // テンプレート選択セレクトボックスのonChangeハンドラ
  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  }

  // グラフ設定値のステートをまとめて宣言
  const [settingValues, setSettingValues] = useState(initialSettingValues);   //初期値はinitialSettingValues.jsで定義
  //グラフ設定値更新ハンドラ（共通化して対象のみ更新する）
  const handleValueChange = (name, value) => {
    setSettingValues({...settingValues, [name]: value});
  }

  //********** useEffectによる自動fetch処理 **********//

  const url = new URL(window.location.href);      // 現在のURLを取得
  const params = new URLSearchParams(url.search);    // URLSearchParamsオブジェクトを取得
  const graphParam = params.get('graph');     // グラフパラメータを取得

  // --------- 都市データ(city)処理 ----------- //
  //cityIdの更新を監視して都市データcityを取得。fetch処理完了でcityLoadingをfalseに
  const { city, cityLoading, setCityLoading } = useCity(cityId);
  //useEffectで都市データcityを監視し，データが取得されたらグラフ描画用のデータに整形してstateにセット
  useEffect(() => {
    console.log('こちらはindexのuseEffectです。city:', city, 'cityLoading:', cityLoading)
    if (city) {
      console.log('city_name:', city.name)
      const reshapedData = reshapeData(city)
      setGraphInput(reshapedData)
      if (!graph) {  //マイグラフデータ一覧からの遷移でない場合，設定値タイトルを都市名に設定
        setSettingValues({...settingValues, title: city.name});   //グラフ設定値のタイトルの初期値を都市名に設定
      }
    }
  },[city]);
  

  // ----------- ログイン状態確認処理 ------------- //
  //ログイン状態を取得。fetch処理完了でloginCheckLoadingをfalseに
  const { loggedIn, loginCheckLoading } = checkLoggedIn();

  
  // --------- マイグラフ(graph)処理 ----------- //
  //マイグラフ一覧から遷移した際に加えられるパラメータを利用してマイグラフデータを取得。
    //未ログイン状態であれば取得を実行しない。fetch処理完了または未ログイン確認でgraphLoadingをfalseに
    //マイグラフデータが取得されたら，cityIdが更新されてuseCityが再度走るため，cityLoadingを渡してtrueにする（⭐改善の余地あり）
  const { graph, graphLoading } = useGraph(graphParam, loginCheckLoading, loggedIn, setCityLoading);  
  //useEffectでマイグラフデータgraphを監視し，データが取得されたらマイグラフ情報をstateにセット
  useEffect(() => {
    if (graph) {
      console.log('graphのcity_id:', graph.graph.city_id)

      if (graph.graph.city_id !== cityId) {  //マイグラフのcity_idが現在のcityIdと異なる場合は，cityIdを更新
        setCityId(graph.graph.city_id);   //マイグラフに紐づくcity_idでstateを更新 → 都市データのfetchが走る
      } else {
        setCityLoading(false);  //cityIdが更新されない場合は，cityLoadingをfalseにしてメインコンポーネントのレンダリングを再開
      }

      setSettingValues(graph.graph_setting.settings);  //マイグラフの設定値をstateにセット
    }
  }, [graph]);

  // --------- マイテンプレート(template)処理 ----------- //
  //テンプレート一覧を取得。未ログイン状態であれば取得を実行しない。
  const { templateList } = getTemplateList(loginCheckLoading, loggedIn);
  //useEffectでテンプレート一覧を監視し，データが取得されたらテンプレート一覧をstateにセット
  useEffect(() => {
    if (templateList.length > 0) {         //templateListステートの初期値は[]
      setTemplateOptions(templateList);
    }
  }, [templateList]);


  //********** useEffectによる自動fetch処理  ここまで **********//


  if ( loginCheckLoading || graphLoading || cityLoading ) {
    console.log('show loading')
    return <div className='flex items-center justify-center m-20 text-xl font-bold '>読み込み中です...</div>
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
        <ButtonGroup 
          variant="contained"
          aria-label="Basic button group"
          sx={{ marginTop: 3,  marginBottom: 3 }}
          >
          <Tooltip title="画像ファイル出力">
            <Button 
              // sx={{ background: "#5a7c65" }} 
              onClick={handleOpenDLImageModal}><AiOutlinePicture size={35}/>
            </Button>
          </Tooltip>
          <Tooltip title={loggedIn ? "マイグラフ保存" : "マイグラフ機能はログイン後に利用できます" }>
            <span>               {/* disabled中のボタンにもTooltipをつけるには，spanタグで囲む必要がある */}
              <Button onClick={handleOpenMyGraphModal} disabled={!loggedIn} ><MdAddChart size={35}/></Button>
            </span>
          </Tooltip>
          <Tooltip title="都市データ選択">
            <Button onClick={toggleBottomDrawer}><FaEarthAsia size={30}/></Button>
          </Tooltip>
          <Tooltip title="グラフ設定を開く">
            <Button onClick={toggleRightDrawer} ><AiOutlineControl size={30}/></Button>
          </Tooltip>
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
          graphSetting={settingValues}
          cityId={cityId}
          open={openMyGraphModal}
          handleClose={handleCloseMyGraphModal} />

        {/* マイテンプレート登録モーダル */}
        <MyTemplateModal
          graphSetting={settingValues}
          open={openMyTemplateModal}
          handleClose={handleCloseMyTemplateModal} />

      {/* グラフ描画と右ドロワーをラップしたBox */}
      <Box sx={{ display: 'flex' }}>

        {/* open時に右ドロワーの幅だけ縮むMain描画部分 */}
        <Main open={openRightDrawer} >

          {/* <div className='text-xl'> {graph.graph_setting.settings.dotSize} </div>
          <div className='text-xl'> {JSON.stringify(graph.graph_setting)} </div> */}

          {/* Rechartsグラフ描画部分 */}
          <div className='flex justify-center items-center'>
            <Graph data={graphInput} sv={settingValues}/>
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
              border: "3px solid #b9b1b1",
              display: "flex",
              // padding: "20px",
              alignItems: "center",
              boxShadow: "5px 0px 7px 0px rgba(0,0,0,0.4)",
              
            }
          }}
          // className={[classes.drawer, 'text-3xl']}
          variant="persistent"
          anchor="right"
          open={openRightDrawer}
        >
          {/* Closeボタン >> */}
          <Box sx={{width: '100%', backgroundColor: '#b9b1b1'}}>
            <IconButton
              onClick={handleCloseRightDrawer}
              size='large'
              sx={{padding: '4px', borderRadius: 0}}>
              <HiChevronDoubleRight />
            </IconButton>
          </Box>

          <Box backgroundColor="" marginBottom='60px' width='100%'>
            <Tooltip title={loggedIn ? "" : "テンプレート機能はログイン後に利用できます" }>
              <span>
                <Button 
                  disabled={!loggedIn}
                  onClick={() => updateByTemplate(selectedTemplate, settingValues.title, setSettingValues)}
                  variant='contained'
                  sx={{ 
                    height: 30,
                    width: '100%',
                  }}
                >
                  選択中のテンプレートを適用
                </Button>
              </span>
            </Tooltip>
            <FormControl 
              variant='filled'
              disabled={!loggedIn}
              sx={{ height: 40, width: '100%', marginBottom: '0px'}}
            >
              <InputLabel>テンプレートを選択</InputLabel>
              <Select value={selectedTemplate} onChange={handleTemplateChange}>
                {templateOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box backgroundColor="" marginBottom='10px' width='100%'>
            <Divider sx={{ borderBottomWidth: 1.5, borderColor: '#b9b1b1' }} />
          </Box>

          <Box backgroundColor="" marginBottom='10px' width='100%'>
            <Tooltip title={loggedIn ? "" : "テンプレート機能はログイン後に利用できます" }>
              <span>
                <Button
                  disabled={!loggedIn}
                  onClick={handleOpenMyTemplateModal}
                  variant='contained'
                  sx={{ height: 30, width: '100%'}}
                >
                  設定をマイテンプレートに保存
                </Button>
              </span>
            </Tooltip>
          </Box>

          {/* グラフ設定値入力コンポーネント */}
          <GraphSettings settingValues={settingValues} handleValueChange={handleValueChange}/>
          {/* <div className='my-10'>ここはGraphSettingsの外（mainコンポーネント） {lineDotSize}</div> */}

        </Drawer>
      </Box>

      {/* 下ドロワー */}
      <BottomDrawer 
        open={openBottomDrawer}
        handleClose={handleCloseBottomDrawer}
        setCityId={setCityId}/>
    </>
  );
}