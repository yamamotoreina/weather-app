// src/hooks/useWeatherSearch.ts
import { useState } from "react"
import { weatherService } from "../services/weatherService"
import type { CurrentWeather, ForecastDay } from "../types/weather"

export function useWeatherSearch() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(false)

  async function searchWeather(cityName: string) {
    if (!cityName) return
    setLoading(true)
    try {
      const currentData = await weatherService.fetchCurrent(cityName)
      if (currentData) setCurrent(currentData)

      const forecastData = await weatherService.fetchForecast(cityName)
      setForecast(forecastData)
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
    searchWeather,
  }
}
