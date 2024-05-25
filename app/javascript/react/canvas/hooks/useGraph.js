import { useState, useEffect } from 'react';

export const useGraph = (
  param,                    //引数にgraphParamと，ログインチェック中状態，ログイン状態を受け取る
  loginCheckLoading,
  loggedIn,
  setCityLoading
  ) => {               
  const [graph, setGraph] = useState(null);        //初期値は空の配列
  const [graphLoading, setGraphLoading] = useState(true);   //ここのローディング状態を管理するstate

  useEffect(() => {                             //useEffectはレンダリング完了時に実行される
    
    if (loginCheckLoading) {   
      console.log('useGraphです。ログインチェック中のためreturnします')                 //ログインチェック中の場合は，何もせず即リターン
      return;
    }

    if (!loggedIn) {              //ログインしていない場合は，ここのローディング状態をfalseにするだけで即リターン
      console.log('useGraphです。ログインしていないのでreturnします')
      setGraphLoading(false);
      return;
    }

    if (!param) {     //ログインしているが，graphParamがnullの場合は，ここのローディング状態をfalseにするだけで即リターン
      console.log('useGraphです。graphParamがnullなのでreturnします')
      setGraphLoading(false);
      return;
    }

    async function fetchGraph(param) {         //ここからfetch関数を定義。
      try{
        const response = await fetch(`/api/graphs/${param}`);   //api/graphs/:idにfetchリクエストを送る（showアクション）
        if (response.ok) {
          console.log('useGraphです。response.okを受け取りました')
          const graph = await response.json();
          setGraph(graph);  //取得したgraphデータをstateにセット
          setCityLoading(true);     //この後cityデータを再取得するため，cityLoadingをtrueにしておく
        }
      } catch (error) {
        console.log('graphデータのfetchに失敗しました。', error);
      } finally {
        setGraphLoading(false);  //fetch終了時にローディング状態をfalseに
      }
    }
    console.log('useGraphです。fetchGraphを実行します')
    fetchGraph(param);    //上で定義したfetch関数を実行
  }, [param, loginCheckLoading, loggedIn]);            //paramとloginCheckLoadingが変更されたことを監視

  return { graph, graphLoading }
}
