import location from "../../assets/data/prefectures_major_cities_100.json"
import { NotFoundError } from "../types/error"
import { normalizeText } from "../utils/normalizeText"

//JSON座標から都道府県・都市を検索し、緯度経度を返す
export const locationService = {
  findLocation(cityName: string) {
  const normalized = normalizeText(cityName) //検索の文字ゆれを正規化

  const city = location.find((loc) => {
    //.find() は条件に合う最初の要素を返すメソッド  //locationsはJSONファイルから読み込んだデータの配列
    const nameNorm = normalizeText(loc.prefecture)//県名
    const cityNorm = normalizeText(loc.city || loc.prefecture) //市区町村があるときはcityないときは都道府県で対応
    return (
      nameNorm.includes(normalized) || //都道府県名に入力文字が含まれる
      cityNorm.includes(normalized) || //市区町村名に入力文字が含まれる
      normalized.includes(nameNorm) //入力文字に都道府県名が含まれる
    )
  })

  // 整形して返す
  return city
    ? {
        lat: city.lat,
        lon: city.lon,
        prefecture: city.prefecture,
        city: city.city || city.prefecture
      }
    : null


  },  //WeatherServiceデータ取得処理などで、見つからないときに強制的に例外処理したい場合

  
   findLocationOrThrow(query: string) {
    const normalized = normalizeText(query)

    const city = location.find((loc) => {
      const nameNorm = normalizeText(loc.prefecture)
      const cityNorm = normalizeText(loc.city || loc.prefecture)
      return (
        nameNorm.includes(normalized) ||
        cityNorm.includes(normalized) ||
        normalized.includes(nameNorm)
      )
    })

    if (!city) throw new NotFoundError(`location not found: "${query}"`)

    return {
      lat: city.lat,
      lon: city.lon,
      prefecture: city.prefecture,
      city: city.city || city.prefecture,
    }
  }
}