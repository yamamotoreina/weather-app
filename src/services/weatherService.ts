import { weatherApi } from "../api/weatherApi"
import { locationService } from "./locationService"
import type { CurrentWeather, ForecastDay } from "../types/weather"
import {
  saveToHistory,
  saveLatestWeather,
  getLatest
} from "../db/weatherRepository"

//locationService + weatherApi を組み合わせ、アプリ用の整形データを返す

const CACHE_TTL_HOURS = 3 // 3時間以内ならキャッシュを使う

export const weatherService = {
  // 現在の天気を取得
  async fetchCurrent(cityName: string): Promise<CurrentWeather | null> {
    try {
      const loc = locationService.findLocationOrThrow(cityName) //JSONから緯度経度を探す
      const latest = await getLatest(loc.city)

      // --- キャッシュチェック ---
      if (latest && !shouldUpdate(latest.updatedAt)) {
        console.log("キャッシュ使用:", loc.city)
        return latest
      }

      const data = await weatherApi.getCurrentWeather(loc.lat, loc.lon) //OpenWeatherMap呼び出し

      // 雨量の取得（1時間または3時間）
      const rainVolume = data.rain?.["1h"] ?? data.rain?.["3h"] ?? 0
      const rainChance =
        rainVolume === 0
          ? 0
          : rainVolume < 0.1
          ? 10
          : rainVolume < 0.3
          ? 20
          : rainVolume < 0.5
          ? 30
          : rainVolume < 0.8
          ? 40
          : rainVolume < 1.2
          ? 50
          : rainVolume < 2.0
          ? 60
          : rainVolume < 3.0
          ? 70
          : rainVolume < 5.0
          ? 80
          : rainVolume < 7.0
          ? 90
          : 100

      //整形して返す
      const current: CurrentWeather = {
        city: loc.city || loc.prefecture,
        prefecture: loc.prefecture,
        date: new Date(data.dt * 1000).toLocaleDateString("ja-JP", {
          month: "2-digit",
          day: "2-digit"
        }),
        temp: Math.round(data.main.temp),
        tempMax: Math.round(data.main.temp_max),
        tempMin: Math.round(data.main.temp_min),
        rain: rainChance, // ← 簡易降水確率(%)
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        lat: loc.lat,
        lon: loc.lon,
        updatedAt: new Date().toISOString()
      }
      // --- DB保存 ---
      await saveLatestWeather(current)
      await saveToHistory(current)

      console.log("🌤️ APIから取得:", loc.city)
      return current
    } catch (error) {
      console.error("fetchCurrent失敗:", error)

      // --- オフラインフォールバック ---
      const cached = await getLatest(cityName)
      if (cached) {
        console.warn("オフラインキャッシュ使用")
        return cached
      }
      // 全パスで return を保証する
      return null
    }
  },

  /** 5日間の天気を取得 */
  async fetchForecast(city: string): Promise<ForecastDay[]> {
    const loc = locationService.findLocation(city)
    if (!loc) throw new Error("指定した都市の位置情報が見つかりません。")

    const data = await weatherApi.getForecast(loc.lat, loc.lon)

    // 3時間ごとのデータを日付単位でグループ化
    const grouped: Record<string, ForecastDay> = {}
    data.list.forEach((item: any) => {
      const dateStr = item.dt_txt.split(" ")[0] // "2025-10-21 12:00:00" → "2025-10-21"
      const existing = grouped[dateStr]

      if (!existing) {
        const date = new Date(dateStr)
        grouped[dateStr] = {
          date: `${date.getMonth() + 1}/${date.getDate()}`,
          tempMax: item.main.temp_max,
          tempMin: item.main.temp_min,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          rain: Math.round(item.pop * 100) // 降水確率(%)
        }
      } else {
        // 日ごとの最大・最小を更新
        existing.tempMax = Math.max(existing.tempMax, item.main.temp_max)
        existing.tempMin = Math.min(existing.tempMin, item.main.temp_min)
      }
    })

    return Object.values(grouped).slice(0, 5) // 5日分だけ返す
  }
}
/** キャッシュ有効期限チェック関数 */
function shouldUpdate(updatedAt: string): boolean {
  const last = new Date(updatedAt).getTime()
  const now = Date.now()
  const diffHours = (now - last) / 1000 / 60 / 60
  return diffHours > CACHE_TTL_HOURS
}
