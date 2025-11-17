//API通信や保存ロジック
import type { CurrentWeather, Forecast3h, ForecastDay } from "../types/weather"
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const weatherService = {
  // 現在の天気
  async fetchCurrent(cityName: string): Promise<CurrentWeather | null> {
    try {
      const url = `${BASE_URL}/api/weather/current/?q=${encodeURIComponent(cityName)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error("天気取得失敗")

      const data = await res.json()
      console.log("現在の天気:", data)
      return data
    } catch (error) {
      console.error("fetchCurrent失敗:", error)
      return null
    }
  },

  // 5日間の天気予報
  async fetchForecast(cityName: string): Promise<ForecastDay[]> {
    try {
      const url = `${BASE_URL}/api/weather/forecast/?q=${encodeURIComponent(cityName)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error("天気予報取得失敗")

      const data = await res.json()
      console.log("週間天気:", data)
      // data 自体が配列
      const dailyArray = Array.isArray(data.forecast)
        ? data.forecast
        : Array.isArray(data)
        ? data
        : []
      return dailyArray.slice(0, 5).map((item: any) => ({
        date: item.date || new Date(item.dt * 1000).toISOString(),
        description:
          item.description || item.weather?.[0]?.description || "不明",
        icon: item.icon || item.weather?.[0]?.icon || null,
        rain: item.rain ?? Math.round((item.pop ?? 0) * 100),
        tempMax: item.tempMax ?? item.temp?.max ?? 0,
        tempMin: item.tempMin ?? item.temp?.min ?? 0
      }))
    } catch (error) {
      console.error("fetchForecast失敗:", error)
      return []
    }
  },
  //3時間ごとの天気を取得
  async fetchForecast3h(cityName: string): Promise<Forecast3h []> {
    try {
      const url = `${BASE_URL}/api/weather/forecast_3h/?q=${encodeURIComponent(cityName)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error("3時間ごとの天気取得失敗")

      const data = await res.json()
      console.log("3時間ごとの天気:", data)
       // バックエンドのレスポンス形式に合わせて整形
      const list = Array.isArray(data.forecast_3h) ? data.forecast_3h : []
      return list.map((item: any) => ({
        time: item.time,                      // "00", "03",
        tempMax: item.temp_max ?? 0,
        tempMin: item.temp_min ?? 0,
        icon: item.icon ?? null,
        pop: item.pop ?? 0,
      }))
    } catch (error) {
      console.error("fetchForecast3h失敗:", error)
      return null
    }
  },
  
  //前回の都市を取得
  async getLastCity(): Promise<string | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/weather/last_city/`)
      if (!res.ok) throw new Error("前回都市の取得失敗")
      const data = await res.json()
      return data.city || null
    } catch (err) {
      console.error("getLastCity失敗:", err)
      return null
    }
  },

  //前回の都市を保存
  async saveLastCity(cityName: string): Promise<void> {
    try {
      await fetch(`${BASE_URL}/api/weather/save_last_city/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: cityName }),
      })
      console.log("サーバーに保存完了:", cityName)
    } catch (err) {
      console.error("saveLastCity失敗:", err)
    }
  },
}
