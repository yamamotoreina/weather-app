import { useState } from "react"
import { CurrentWeather, ForecastDay } from "../types/weather"
import { weatherService } from "../api/weatherService"

export const useWeatherSearch = () => {
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(false)

  const searchWeather = async (city:string)=>{
    setLoading(true)
    try{
      const currentData = await weatherService.fetchCurrent(city)
      const forecastData = await weatherService.fetchForecast(city)
      setCurrent(currentData)
      setForecast(forecastData)
    }catch(error){
      console.error("天気データ取得エラー:",error)
    }finally {
      setLoading(false)
    }
  }  
  return { current, forecast, loading, searchWeather }
}