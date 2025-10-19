//型定義
//現在の天気情報
export type CurrentWeather = {
  city:string
  temp:number
  description: string
  icon:string
  humidity: number
  windSpeed:number
}
//日ごとの予報（5日分など）
export type ForecastDay = {
  date: string
  temp: number
  description: string
  icon: string
}