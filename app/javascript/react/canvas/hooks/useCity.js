import { useState, useEffect } from 'react';

export const useCity = (
  // param （都市idを受ける）
  ) => {
  const [city, setCity] = useState(null);        //初期値はnull
  const [cityLoading, setCityLoading] = useState(true);   //ここのローディング状態を管理するstate

  useEffect(() => {
    async function fetchCity() { 
      try {
        const response = await fetch('/api/cities/1');   //api/cities/:idにfetchリクエストを送る（showアクション）
        if (response.ok) {
          console.log('fetchCityです。response.okを受け取りました')
          const city = await response.json();
          if (city) {
            setCity(city);  //cityデータをstateにセット
          } else {
            console.log('city not found');
          }
        } else {
          console.log('server error!');
        }
      } catch (error) {
        console.log('failed to fetch', error);
      } finally {
        setCityLoading(false);  //fetch終了時にローディング状態をfalseに
      }
    }
    fetchCity();   //上で定義したfetch関数を実行
  }, []);
  return { city, cityLoading };    //cityデータを返す
}
