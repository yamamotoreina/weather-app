import type { CurrentWeather, ForecastDay } from "../types/weather"

const BASE_URL = "http://127.0.0.1:8000/api/weather"

export const weatherService = {
  // 現在の天気
  async fetchCurrent(cityName: string): Promise<CurrentWeather | null> {
    try {
      const url = `${BASE_URL}/current/?q=${encodeURIComponent(cityName)}`
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
      const url = `${BASE_URL}/forecast/?q=${encodeURIComponent(cityName)}`
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
  }
}
