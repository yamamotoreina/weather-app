//UIや状態管理
import { useState, useEffect } from "react"
import { weatherService } from "../services/weatherService"
import type { CurrentWeather, Forecast3h, ForecastDay } from "../types/weather"

export function useWeatherSearch() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [forecast3h, setForecast3h] = useState<Forecast3h[]>([])
  const [loading, setLoading] = useState(false)

  //起動時：localStorage → バックエンドの順に確認
  useEffect(() => {
    async function initSearch() {
      try {
        const localCity = localStorage.getItem("lastCity")

        if (localCity) {
          console.log("localStorageの都市:", localCity)
          await searchWeather(localCity)
          return
        }

        // localStorage になければバックエンドから取得
        const serverCity = await weatherService.getLastCity()
        if (serverCity) {
          console.log("サーバーの前回都市:", serverCity)
          await searchWeather(serverCity)
        } else {
          console.log("前回の検索データなし")
        }
      } catch (err) {
        console.error("初期検索エラー:", err)
      }
    }
    initSearch()
  }, [])

  //検索処理
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
        
      //保存処理
      localStorage.setItem("lastCity", cityName)
      await weatherService.saveLastCity(cityName)
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
