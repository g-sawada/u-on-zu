import React, { useState, useEffect } from "react";

import { Button } from '@mui/material';
import { AiOutlinePicture } from "react-icons/ai";

import Graph from '../canvas/components/graph/graph';
import { data_tokyo } from "../canvas/components/graph/tokyo";
import { initialSettingValues } from "../canvas/initialSettingValues";
import { reshapeData } from "../canvas/components/graph/reshapeData";
import DownloadImageModal from "../canvas/components/download_image/download_image_modal";

import { useCity } from "../canvas/hooks/useCity";
import { useGraph } from "../canvas/hooks/useGraph";


// ボタンのスタイリング
export const customButtonStyles = {
  backgroundColor: '#76A284',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#5a7c65',
  },
};


export default function MyGraphApp({graphId}) {
  
  const graphParam = graphId; //ビューファイルでdata-id属性にセットされたIDをpropで受け取る

  //グラフに投入する気候データ
  //初期値はcityIdのfetchエラーを想定して東京のモックデータにしておく。⭐fix対象
  const [graphInput, setGraphInput] = useState(data_tokyo);

  //グラフ設定値
  //初期値はfetchエラーを想定してinitialSettingValuesをセット ⭐fix対象
  const [settingValues, setSettingValues] = useState(initialSettingValues);
  
  //都市ID
  const [cityId, setCityId] = useState(null);

  //画像DLモーダルのステートとハンドラ
  const [openDLImageModal, setOpenDLImageModal] = useState(false);
  const handleOpenDLImageModal = () => setOpenDLImageModal(true);
  const handleCloseDLImageModal = () => setOpenDLImageModal(false);
  
  // --------- 都市データ(city)処理 ----------- //
  //cityIdの更新を監視して都市データcityを取得。fetch処理完了でcityLoadingをfalseに
  const { city, cityLoading, setCityLoading } = useCity(cityId);
  //useEffectで都市データcityを監視し，データが取得されたらグラフ描画用のデータに整形してstateにセット
  useEffect(() => {
    if (city) {
      const reshapedData = reshapeData(city)
      setGraphInput(reshapedData)
    }
  },[city]);

  // --------- マイグラフ(graph)処理 ----------- //
  //マイグラフ一覧から遷移した際に加えられるパラメータを利用してマイグラフデータを取得。
    //未ログイン状態であれば取得を実行しない。fetch処理完了または未ログイン確認でgraphLoadingをfalseに
    //マイグラフデータが取得されたら，cityIdが更新されてuseCityが再度走るため，cityLoadingを渡してtrueにする（⭐改善の余地あり）

    //⭐ここはマイグラフ詳細なので最初からログイン中としておく
    const loginCheckLoading = false;
    const loggedIn = true;

    //graphデータを取得 graphParamはURLから取得したマイグラフID
    const { graph, graphLoading } = useGraph(graphParam, loginCheckLoading, loggedIn, setCityLoading);  

    useEffect(() => {
      if (graph) {  
        if (graph.graph.city_id !== cityId) {  //マイグラフのcity_idが現在のcityIdと異なる場合は，cityIdを更新
          setCityId(graph.graph.city_id);   //マイグラフに紐づくcity_idでstateを更新 → 都市データのfetchが走る
        } else {
          setCityLoading(false);  //cityIdが更新されない場合は，cityLoadingをfalseにしてメインコンポーネントのレンダリングを再開
        }
        setSettingValues(graph.graph_setting.settings);  //マイグラフの設定値をstateにセット
      }
    }, [graph]);


  //********** 描画部分 **********//
  if ( loginCheckLoading || graphLoading || cityLoading ) {
    console.log('show loading')
    return <div className='flex items-center justify-center m-20 text-xl font-bold '>読み込み中です...</div>
  }

  console.log('show graph')
  return (
    <>
      {/* 画像DLモーダル */}
      <DownloadImageModal 
        settingValues={settingValues}
        open={openDLImageModal}
        handleClose={handleCloseDLImageModal}
        cityId={cityId}
      />

      <div className='flex flex-col justify-center items-center'>
        <div className="w-9/12 flex justify-start mb-3">
          <button className="btn btn-sm btn-primary px-2"
              onClick={handleOpenDLImageModal}
            >
              <AiOutlinePicture size={20}/>
          </button>
        </div>
        <Graph data={graphInput} sv={settingValues}/>
      </div>
    </>
  )
}