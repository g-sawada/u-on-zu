import { useState, useEffect } from 'react';

export const checkLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false); //ログイン状態を管理するstateを宣言
  const [loginCheckLoading, setLoginCheckLoading] = useState(true); //ログインチェック中状態を管理するstateを宣言

  useEffect(() => {                   //useEffectはレンダリング完了時に実行される
    async function fetchLoggedIn() {  //ここからfetch関数を定義。
      try {
        const response = await fetch('/api/check_login');
        if (response.ok) {
          console.log('checkLoggedInです。response.okを受け取りました')
          const data = await response.json();
          if (data.logged_in) {
            setLoggedIn(true);  //ログイン状態をtrueに
            console.log('check logged in ;)');
          } else {
            console.log('not logged in :(');
          }
        } else {
          console.log('server error!');
        }
      } catch (error) {
        console.log('failed to fetch', error);
      } finally {
        setLoginCheckLoading(false);  //fetch終了時にローディング状態をfalseに
      }
    }
    fetchLoggedIn();   //上で定義したfetch関数を実行
  }, []);
  // console.log('loggedIn:', loggedIn, ' loginCheckLoading:',  loginCheckLoading)
  return { loggedIn, loginCheckLoading };    //ログイン状態を返す
}