// src/services/weatherService.ts
import type { CurrentWeather, ForecastDay } from "../types/weather"

export const weatherService = {
  // 現在の天気
  async fetchCurrent(cityName: string): Promise<CurrentWeather | null> {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/weather/current/${encodeURIComponent(cityName)}/`
      )
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
      const res = await fetch(
        `http://127.0.0.1:8000/api/weather/forecast/${encodeURIComponent(cityName)}/`
      )
      if (!res.ok) throw new Error("天気予報取得失敗")

      const data = await res.json()
      console.log("週間天気:", data)
      return Array.isArray(data.forecast) ? data.forecast : []
    } catch (error) {
      console.error("fetchForecast失敗:", error)
      return []
    }
  },
}
