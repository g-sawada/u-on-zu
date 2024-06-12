import React, { useState, useEffect } from "react";
import Graph from '../canvas/components/graph/graph';
import { data_tokyo } from "../canvas/components/graph/tokyo";
import { initialSettingValues } from "../canvas/initialSettingValues";
import { reshapeData } from "../canvas/components/graph/reshapeData";

import { useCity } from "../canvas/hooks/useCity";
import { useGraph } from "../canvas/hooks/useGraph";

export default function MyGraphApp({graphId}) {
  
  // //マイグラフIDパラメータをURLから取得  http://localhost:3000/graphs/32
  // const url = window.location.href;
  // const graphParam = url.split('/').pop();   //URLを'/'で区切り，末尾のIDを取得
  
  const graphParam = graphId; //ビューファイルでdata-id属性にセットされたIDをpropで受け取る

  //グラフに投入する気候データ
  //初期値はcityIdのfetchエラーを想定して東京のモックデータにしておく。⭐fix対象
  const [graphInput, setGraphInput] = useState(data_tokyo);

  //グラフ設定値
  //初期値はfetchエラーを想定してinitialSettingValuesをセット ⭐fix対象
  const [settingValues, setSettingValues] = useState(initialSettingValues);
  
  //都市ID
  const [cityId, setCityId] = useState(null);
  
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
    <div className='flex justify-center items-center'>
      <Graph data={graphInput} sv={settingValues}/>
    </div>
  )
}