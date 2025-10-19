import { weatherApi } from "./weatherApi"
import type { CurrentWeather, ForecastDay } from "../types/weather"

export const weatherService = {
  async fetchCurrent(city: string): Promise<CurrentWeather> {
    const data = await weatherApi.getCurrentWeather(city)
    return {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    }
  },
  async fetchForecast(city: string): Promise<ForecastDay[]> {
    const data = await weatherApi.getForecast(city)

    //3時間ごとのデータから1日ごとの代表値を抽出
    const grouped: Record<string, ForecastDay> = {}
    data.list.forEach((item: any) => {
      const date = item.dt_txt.split("")[0]
      if (!grouped[date]) {
        grouped[date] = {
          date,
          temp: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        }
      }
    })
    return Object.values(grouped)
  }
}
