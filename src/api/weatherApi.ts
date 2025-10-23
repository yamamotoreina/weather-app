import axios from "axios"
import { API_KEY, BASE_URL } from "@env"
console.log("API_KEY:", API_KEY)
console.log("BASE_URL:", BASE_URL)
export const weatherApi = {
  /**
   * 現在の天気を取得
   * @param lat 緯度
   * @param lon 経度
   */
  async getCurrentWeather(lat: number, lon: number) {
    try {
      const res = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric", // 摂氏
          lang: "ja" // 日本語
        }
      })
      return res.data
    } catch (error: any) {
      console.error(
        "現在の天気取得エラー:",
        error.response?.data || error.message
      )
      throw error
    }
  },

  /**
   * 5日間の天気予報を取得
   * @param lat 緯度
   * @param lon 経度
   */
  async getForecast(lat: number, lon: number) {
    try {
      const res = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric",
          lang: "ja"
        }
      })
      return res.data
    } catch (error: any) {
      console.error(
        "週間天気取得エラー:",
        error.response?.data || error.message
      )
      throw error
    }
  }
}

export const axiosClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10_000 // 10s
})

// request/response logger (開発時のみ)
axiosClient.interceptors.request.use((req) => {
  console.debug("[HTTP req]", req.method, req.url, req.params)
  return req
})
axiosClient.interceptors.response.use(
  (res) => {
    console.debug("[HTTP res]", res.status, res.config.url)
    return res
  },
  (err) => {
    console.error("[HTTP err]", err?.response?.status, err?.message)
    return Promise.reject(err)
  }
)
