import { useState, useEffect } from 'react';

export const useGraph = (param) => {            //引数はgraphParamを受ける
  const [graph, setGraph] = useState([]);       //初期値は空の配列
  const [loading, setLoading] = useState(true); //fetch完了まで描画してはいけないのでloadingをtrueに

  useEffect(() => {                             //useEffectはレンダリング完了時に実行される
    async function fetchGraph(param) {          //ここからfetch関数を定義。
      console.log('param: ', param)
      try {
        const response = await fetch(`/api/graphs/${param}`);   //api/graphs/:idにfetchリクエストを送る（showアクション）
        if (response.ok) {
          const graph = await response.json();
          console.log(graph)
          setGraph(graph);  //取得したgraphデータをstateにセット
          setLoading(false); //fetch完了したのでloadingをfalseに
        } else {
          console.log('server error!');
          setLoading(false);  //fetch処理は完了したのでloadingをfalseに
        }
      } catch (error) {
          console.log('failed to fetch', error);
          setLoading(false);
      }
    }

    fetchGraph(param);    //上で定義したfetch関数を実行
  }, []);                 //useEffectここまで。第二引数に空の配列を渡すことで、初回レンダリング時のみfetchを実行する

  return { graph, loading }   //fetchしたgraphデータとloadingのstateを返す
}
