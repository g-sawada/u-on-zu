import { useState, useEffect } from 'react';

export const useCity = (cityId) => {             //idを引数で受ける
  const [city, setCity] = useState(null);        //初期値はnull
  const [cityLoading, setCityLoading] = useState(true);   //ここのローディング状態を管理するstate
  useEffect(() => {
    console.log('useCityです。cityId:', cityId)
    async function fetchCity(cityId) {
      try {
        const response = await fetch(`/api/cities/${cityId}`);   //api/cities/:idにfetchリクエストを送る（showアクション）
        if (response.ok) {
          console.log('fetchCityです。response.okを受け取りました')
          const cityData = await response.json();
          if (cityData) {
            setCity(cityData);  //cityデータをstateにセット
            // console.log('localStorageを更新します', cityId)
            // localStorage.setItem('cityId', JSON.stringify(cityId));
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
    fetchCity(cityId);   //上で定義したfetch関数を実行
  }, [cityId]);    //cityIdが変更されたことを監視
  return { city, cityLoading, setCityLoading };
}
