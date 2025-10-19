import axios from "axios"
//HTTP通信の処理

const API_KEY= "1f3e9cead4a9459b184253af5cca915b"
const BASE_URL= "https://api.openweathermap.org/data/2.5"

export const weatherApi = {
  //現在の天気
  getCurrentWeather: async (city:string) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ja`
    const res = await axios.get(url)
    return res.data
  },

  getForecast: async (city:string) => {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ja`
    const res = await axios.get(url)
    return res.data
  }
}