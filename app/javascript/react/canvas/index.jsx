import React, { useState, useEffect, useRef } from 'react';

// Material-UI
import {  
          Box,
          Button,
          ButtonGroup,
          Divider,
          Drawer,
          FormControl,
          IconButton,
          InputLabel,
          MenuItem,
          Select,
          Tooltip 
        } from '@mui/material';

import { styled } from '@mui/material/styles';
// import { makeStyles } from "@material-ui/core/styles";

// react
import { MdAddChart } from "react-icons/md";
import { FaEarthAsia } from "react-icons/fa6";
import { AiOutlinePicture, AiOutlineControl } from "react-icons/ai";
import { HiChevronDoubleRight } from "react-icons/hi";

//Other Plugins
import { tourGuide } from './tourGuide';

// Components
import Graph from './components/graph/graph';
import BottomDrawer from './components/fetch_city_data/bottom_drawer';
import GraphSettings from './components/graph_settings/graph_settings';
import DownloadImageModal from './components/download_image/download_image_modal';
import MyGraphModal from './components/create_mygraph/mygraph_modal';
import MyTemplateModal from './components/create_mytemplate/mytemplate_modal';

import { checkLoggedIn } from './hooks/checkLoggedIn';
import { useGraph } from './hooks/useGraph';
import { useCity } from './hooks/useCity';
import { getTemplateList } from './hooks/getTemplateList';
import { updateByTemplate } from './components/fetch_template/updateByTemplate';

import { initialSettingValues } from './initialSettingValues';
import { data_tokyo } from './components/graph/tokyo';
import { reshapeData } from './components/graph/reshapeData';


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

// ボタンのスタイリング
export const customButtonStyles = {
  backgroundColor: '#76A284',
  color: '#fff',
  // borderColor: '#76A284',
  '&:hover': {
    backgroundColor: '#5a7c65',
    // borderColor: '#5a7c65',
  },
};



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

  //********** ログイン状態確認のfetch処理を先に実行 **********//
  // loadingフラグを先にたてておく&ログイン状態の取得を先に実行

  // ----------- ログイン状態確認処理 ------------- //
  //ログイン状態を取得。fetch処理完了でloginCheckLoadingをfalseに
  const { loggedIn, loginCheckLoading } = checkLoggedIn();


  //***************** 各ステート・ハンドラの宣言 *********************//
  // グラフ設定値
  // localStorageから値を取得できた場合はそれを格納。空の場合初期値はinitialSettingValues.jsで定義
  const [settingValues, setSettingValues] = useState(() => {
    const savedState = localStorage.getItem('settingValues');
    return savedState ? JSON.parse(savedState) : initialSettingValues;
  });

  // グラフ設定値ステートの変更を監視して逐一localStorageに保存する
  useEffect(() => {
    // console.log('settingValuesが更新されました。localStorageを更新します', settingValues)
    localStorage.setItem('settingValues', JSON.stringify(settingValues));
  }, [settingValues]);

  //グラフ設定値更新ハンドラ（共通化して対象のみ更新する）
  const handleValueChange = (name, value) => {
    setSettingValues({...settingValues, [name]: value});
  }


  //都市ID
  // localStorageから値を取得できた場合はそれを格納。空の場合初期値は44132（東京）に設定
  // localStorageへの保存はuseCity内で行う
  const [cityId, setCityId] = useState(() => {
    const savedCityId = localStorage.getItem('cityId');
    return savedCityId ? JSON.parse(savedCityId) : 44132;  
  })

  //グラフに投入する気候データ
  //初期値はcityIdのfetchエラーを想定して東京のモックデータにしておく。
  const [graphInput, setGraphInput] = useState(data_tokyo);

  //テンプレート一覧の選択肢
  //初期値は空の配列で，未ログインなら更新しない。
  const [templateOptions, setTemplateOptions] = useState([])

  //選択中のテンプレート
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  // テンプレート選択セレクトボックスのonChangeハンドラ
  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
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
    // console.log('こちらはindexのuseEffectです。city:', city, 'cityLoading:', cityLoading)
    if (city) {
      // console.log('city_name:', city.name)
      const reshapedData = reshapeData(city)
      console.log('localStorageを更新します', cityId)
      localStorage.setItem('cityId', JSON.stringify(cityId));
      setGraphInput(reshapedData)
      if (!graph) {  //マイグラフデータ一覧からの遷移でない場合，設定値タイトルを都市名に設定
        setSettingValues({...settingValues, title: city.name});   //グラフ設定値のタイトルの初期値を都市名に設定
      }
    }
  },[city]);
  
  // --------- マイグラフ(graph)処理 ----------- //
  //マイグラフ一覧から遷移した際に加えられるパラメータを利用してマイグラフデータを取得。
    //未ログイン状態であれば取得を実行しない。fetch処理完了または未ログイン確認でgraphLoadingをfalseに
    //マイグラフデータが取得されたら，cityIdが更新されてuseCityが再度走るため，cityLoadingを渡してtrueにする（⭐改善の余地あり）
  const { graph, graphLoading } = useGraph(graphParam, loginCheckLoading, loggedIn, setCityLoading);  
  //useEffectでマイグラフデータgraphを監視し，データが取得されたらマイグラフ情報をstateにセット
  useEffect(() => {
    if (graph) {
      // console.log('graphのcity_id:', graph.graph.city_id)

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

  const doneTourGuide = localStorage.getItem('doneTourGuide');
  useEffect(() => {
    if(!loginCheckLoading && !graphLoading && !cityLoading)
      if (!doneTourGuide) {
        tourGuide();
        localStorage.setItem('doneTourGuide', true);
        // console.log('localStorageにdoneTourGuideをセットしました')
      } else {
        // console.log('doneTourGuideは既にtrueです')
      }
  }, [loginCheckLoading, graphLoading, cityLoading]);


  //********** 描画部分 **********//
  if ( loginCheckLoading || graphLoading || cityLoading ) {
    // console.log('show loading')
    return <div className='flex items-center justify-center m-20 text-xl font-bold '>読み込み中です...</div>
  }

  return (
    <>
      {/* 操作メニューバー */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          id="tour-two"
          sx={{
            marginTop: 3,
            marginBottom: 3,
            '& .MuiButtonGroup-grouped:not(:last-of-type)': {
              borderRight: '1px solid #5a7c65',
            },
            // 2番目のボタンだけspanタグで囲う必要があり，last-of-typeが使えないため，以下のように記述
            '& .MuiButtonGroup-middleButton': {
              borderRight: '1px solid #5a7c65',
            }
          }}
        >
          <Tooltip title="画像ファイル出力">
            <Button
              sx={{...customButtonStyles}}
              onClick={handleOpenDLImageModal}
              id="tour-six"
            >
              <AiOutlinePicture size={35}/>
            </Button>
          </Tooltip>
          <Tooltip title={loggedIn ? "マイグラフ保存" : "マイグラフ機能はログイン後に利用できます" }>
            {/* disabled中のボタンにもTooltipをつけるには，spanタグで囲む必要がある */}
            <span>
              <Button
                sx={{...customButtonStyles,}}
                onClick={handleOpenMyGraphModal} 
                disabled={!loggedIn}
                id="tour-five"
                >
                  <MdAddChart size={35}/>
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="都市データ選択">
            <Button
              sx={{...customButtonStyles,}}
              onClick={toggleBottomDrawer}
              id="tour-four"
              >
                <FaEarthAsia size={30}/>
            </Button>
          </Tooltip>
          <Tooltip title="デザインバーを開く">
            <Button
              sx={{...customButtonStyles,}}
              onClick={toggleRightDrawer}
              id='tour-three'
            >
          <AiOutlineControl size={30}/>
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Box>

      {/* 画像DLモーダル */}
      <DownloadImageModal 
        settingValues={settingValues}
        open={openDLImageModal}
        handleClose={handleCloseDLImageModal}
        cityId={cityId}
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
              sx={{
                padding: '4px',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: '#a19797', // ホバー時の背景色を変更
                  color: '#FFFFFF', // ホバー時のテキスト色を変更
                },
                }}>
              <HiChevronDoubleRight />
            </IconButton>
          </Box>

          {/* テンプレート適用ボタン・セレクタ */}
          <Box backgroundColor="" marginBottom='60px' width='100%'>
            <Tooltip title={loggedIn ? "" : "テンプレート機能はログイン後に利用できます" }>
              <span>
                <Button 
                  disabled={!loggedIn}
                  onClick={() => updateByTemplate(selectedTemplate, settingValues.title, setSettingValues)}
                  variant='contained'
                  sx={{
                    ...customButtonStyles,
                    borderRadius: 0,
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
              sx={{ 
                height: 40,
                width: '100%',
                marginBottom: '0px',
                '&.Mui-focused': {
                  '& .MuiInputLabel-root': {
                    color: 'green', // フォーカス時のラベルの色を変更する
                  },
                },
              }}
            >
              <InputLabel>テンプレートを選択</InputLabel>
              <Select 
                value={selectedTemplate}
                onChange={handleTemplateChange}
                sx={{ color: "black"}}
              >
                {templateOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* テンプレート保存ボタン */}
          <Box width='100%'>
            <Divider sx={{ borderBottomWidth: 2, borderColor: '#b9b1b1' }} />
          </Box>

          <Box backgroundColor="" marginBottom='2px' width='100%'>
            <Tooltip title={loggedIn ? "" : "テンプレート機能はログイン後に利用できます" }>
              <span>
                <Button
                  disabled={!loggedIn}
                  onClick={handleOpenMyTemplateModal}
                  variant='contained'
                  sx={{ 
                    height: 30,
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: '#7facbd',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#538da2',
                    },
                  }}
                >
                  現在の設定をマイテンプレートに保存
                </Button>
              </span>
            </Tooltip>
          </Box>

          {/* グラフ設定値入力コンポーネント */}
          <GraphSettings settingValues={settingValues} handleValueChange={handleValueChange}/>
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