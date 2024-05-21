import { useState, useEffect } from 'react';

export const useGraph = (
  param,
  loginCheckLoading,
  loggedIn ) => {               //引数にgraphParamと，ログインチェック中状態，ログイン状態を受け取る
  
  const [graph, setGraph] = useState(null);        //初期値は空の配列
  const [graphLoading, setGraphLoading] = useState(true);   //ここのローディング状態を管理するstate

  useEffect(() => {                             //useEffectはレンダリング完了時に実行される
    // console.log('param:', param, ' loginCheckLoading:', loginCheckLoading, ' loggedIn:', loggedIn);
    
    if (loginCheckLoading) {   
      console.log('ログインチェック中のためreturnします')                 //ログインチェック中の場合は，何もせず即リターン
      return
    }

    if (!loggedIn) {              //ログインしていない場合は，ここのローディング状態をfalseにするだけで即リターン
      console.log('ログインしていないのでreturnします')
      setGraphLoading(false);
      return
    }

    if (!param) {     //ログインしているが，graphParamがnullの場合は，ここのローディング状態をfalseにするだけで即リターン
      console.log('graphParamがnullなのでreturnします')
      setGraphLoading(false);
      return
    }

    async function fetchGraph(param) {         //ここからfetch関数を定義。
      try{
        const response = await fetch(`/api/graphs/${param}`);   //api/graphs/:idにfetchリクエストを送る（showアクション）
        if (response.ok) {
          const graph = await response.json();
          setGraph(graph);  //取得したgraphデータをstateにセット
          // console.log('setしたgraph:', graph)
        }
      } catch (error) {
        console.log('failed to fetch', error);
      } finally {
        setGraphLoading(false);  //fetch終了時にローディング状態をfalseに
      }
    }
    // console.log('ここまできてる？')
    // //ここまで来た場合は，ログインしていて，graphParamがnullでない場合
    // async function fetchGraph(param) {         //ここからfetch関数を定義。
    //   try {
    //     const response = await fetch(`/api/graphs/${param}`);   //api/graphs/:idにfetchリクエストを送る（showアクション）
    //     if (response.ok) {
    //       const graph = await response.json();
    //       setGraph(graph);  //取得したgraphデータをstateにセット
    //       console.log('setしたgraph:', graph)
    //     } else {
    //       console.log('server error!');
    //     }
    //   } catch (error) {
    //       console.log('failed to fetch', error);
    //   } finally {
    //     setGraphLoading(false);  //fetch終了時にローディング状態をfalseに
    //   }
    // }
    // console.log("ここにもきてる？？")
    fetchGraph(param);    //上で定義したfetch関数を実行
  }, [param, loginCheckLoading, loggedIn]);            //paramとloginCheckLoadingが変更されたことを監視

  return { graph, graphLoading }   //fetchしたgraphデータを返す
}
