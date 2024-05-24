//city_idでfetchしたデータをRechartsで読み込ませる形式に変換する
export const reshapeData = (fetchedCity) => {
  console.log('fetchedCity:', fetchedCity)

  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const climateDataset = [];

  monthNames.forEach((month, index) => {
    climateDataset.push({
      month: index + 1,
      temp_ave: fetchedCity.data.temp_ave[month],
      rain: fetchedCity.data.rain[month]
    });
  });

  const result = {
    name: fetchedCity.name,
    climateDataset: climateDataset,
    position: fetchedCity.data.position
  }
  // console.log('reshapeDataです。result:', result)
  return result;
}

//seedデータ構造
// {
//   "id": 1,
//   "name": "東京",
//   "data": {
//     "temp_ave": {
//       "jan": 5.4,
//       "feb": 6.1,
//       "mar": 9.4,
//       "apr": 14.3,
//       "may": 18.8,
//       "jun": 21.9,
//       "jul": 25.7,
//       "aug": 26.9,
//       "sep": 23.3,
//       "oct": 18.0,
//       "nov": 12.5,
//       "dec": 7.7
//     },
//     "rain": {
//       "jan": 59.7,
//       "feb": 56.5,
//       "mar": 116.0,
//       "apr": 133.7,
//       "may": 139.7,
//       "jun": 167.8,
//       "jul": 156.2,
//       "aug": 154.7,
//       "sep": 224.9,
//       "oct": 234.8,
//       "nov": 96.3,
//       "dec": 57.9
//     },
//     "position": {
//       "lat": 35.6917,
//       "lng": 139.75,
//       "alt": 25.2
//     }
//   }
// },
