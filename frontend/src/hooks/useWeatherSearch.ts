// src/hooks/useWeatherSearch.ts
import { useState } from "react"
import { weatherService } from "../services/weatherService"
import type { CurrentWeather, Forecast3h, ForecastDay } from "../types/weather"

export function useWeatherSearch() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [forecast3h, setForecast3h] = useState<Forecast3h[]>([])
  const [loading, setLoading] = useState(false)

  async function searchWeather(cityName: string) {
    if (!cityName) return
    setLoading(true)
    try {
      const [currentData, forecastData, forecast3hData] = await Promise.all([
        weatherService.fetchCurrent(cityName),
        weatherService.fetchForecast(cityName),
        weatherService.fetchForecast3h(cityName)
      ])

      if (currentData) setCurrent(currentData)
      if (forecastData) setForecast(forecastData)
      if (forecast3hData) setForecast3h(forecast3hData)

      console.log("天気取得:", forecastData)
    } catch (err) {
      console.error("天気情報取得エラー:", err)
    } finally {
      setLoading(false)
    }
  }

  return {
    current,
    forecast,
    loading,
    forecast3h,
    searchWeather
  }
}
