//型定義
//現在の天気情報
export type CurrentWeather = {
  city: string
  temp: number
  tempMax: number
  tempMin: number
  humidity: number
  description: string
  icon: string
  windSpeed: number,
  rain?: number
  date?: string
}

export type ForecastDay = {
  date: string
  tempMax: number
  tempMin: number
  description: string
  icon: string
  rain: number
}