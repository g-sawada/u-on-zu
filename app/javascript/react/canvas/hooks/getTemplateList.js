import shape from '@material-ui/core/styles/shape';
import { useState, useEffect } from 'react';

export const getTemplateList = (loginCheckLoading, loggedIn) => { //引数にログインチェック中状態，ログイン状態を受け取る
  const [templateList, setTemplateList] = useState([]);        //初期値は空の配列

  useEffect(() =>{
    if (loginCheckLoading) {   
      console.log('getTemplateListです。ログインチェック中のためreturnします')   //ログインチェック中の場合は，何もせず即リターン
      return;
    }

    if (!loggedIn) {              //ログインしていない場合は，ここのローディング状態をfalseにするだけで即リターン
      console.log('getTemplateListです。ログインしていないのでreturnします')
      return;
    }

    async function fetchTemplateList() {         //ここからfetch関数を定義。
      try{
        const response = await fetch(`/api/templates/`);   //api/graphs/:idにfetchリクエストを送る（showアクション）
        if (response.ok) {
          console.log('getTemplateListです。response.okを受け取りました')
          const listData = await response.json();
          const shapedList = listData.templates.map(({id, title}) => ({ id, title})); //idとtitleだけを抽出
          console.log('shapedList : ', shapedList)
          setTemplateList(shapedList);  //抽出したデータをstateにセット
        }
      } catch (error) {
        console.log('templateListのfetchに失敗しました。', error);
      } finally {
      }
    }
    console.log('getTemplateListです。fetchTemplateListを実行します')
    fetchTemplateList();  

  }, [ loginCheckLoading, loggedIn ]);          //loginCheckLoadingとloggedInが変更されたことを監視

  return { templateList }
}