import { useState } from "react"
import { CurrentWeather, ForecastDay } from "../types/weather"
import { weatherService } from "../services/weatherService"
import { saveToHistory } from "@/db/weatherRepository"

export const useWeatherSearch = () => {
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(false)

  // 都市名で天気を検索
  // 成功時は履歴DBに保存
  // 返り値は void

  const searchWeather = async (city: string):Promise<void> => {
    const trimmed = city.trim()
    if(trimmed === "")return// 空文字は無視
    setLoading(true)
    try {
      const currentData = await weatherService.fetchCurrent(city)
      const forecastData = await weatherService.fetchForecast(city)
      setCurrent(currentData)
      setForecast(forecastData)

      //成功時に履歴保存
      if(currentData){
        await saveToHistory(currentData)
      }
    } catch (error) {
      console.error("天気データ取得エラー:", error)
    } finally {
      setLoading(false)
    }
  }
  return { current, forecast, loading, searchWeather }
}
//天気情報取得専用の カスタムフック