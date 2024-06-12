import React, { useState, useEffect } from "react";
import Graph from '../canvas/components/graph/graph';
import { data_tokyo } from "../canvas/components/graph/tokyo";
import { initialSettingValues } from "../canvas/initialSettingValues";
import { reshapeData } from "../canvas/components/graph/reshapeData";

import { useCity } from "../canvas/hooks/useCity";
import { useGraph } from "../canvas/hooks/useGraph";

export default function MyGraphApp() {
  
  //グラフに投入する気候データ
  //初期値はcityIdのfetchエラーを想定して東京のモックデータにしておく。
  const [graphInput, setGraphInput] = useState(data_tokyo);
  const [settingValues, setSettingValues] = useState(initialSettingValues);
  
  //都市ID
  const [cityId, setCityId] = useState(44132);
  
  
  // --------- 都市データ(city)処理 ----------- //
  //cityIdの更新を監視して都市データcityを取得。fetch処理完了でcityLoadingをfalseに
  const { city, cityLoading, setCityLoading } = useCity(cityId);
  //useEffectで都市データcityを監視し，データが取得されたらグラフ描画用のデータに整形してstateにセット
  useEffect(() => {
    console.log('cityId:', cityId)
    if (city) {
      const reshapedData = reshapeData(city)
      setGraphInput(reshapedData)
    }
  },[city]);

  // --------- マイグラフ(graph)処理 ----------- //
  //マイグラフ一覧から遷移した際に加えられるパラメータを利用してマイグラフデータを取得。
    //未ログイン状態であれば取得を実行しない。fetch処理完了または未ログイン確認でgraphLoadingをfalseに
    //マイグラフデータが取得されたら，cityIdが更新されてuseCityが再度走るため，cityLoadingを渡してtrueにする（⭐改善の余地あり）

    const graphParam = 31
    
    //ここはマイグラフ詳細なので最初からログイン中としておく
    const loginCheckLoading = false;
    const loggedIn = true;

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


  return (
    <div className='flex justify-center items-center'>
      <Graph data={graphInput} sv={settingValues}/>
    </div>
  )
}