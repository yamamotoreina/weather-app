const BASE_URL = process.env.REACT_APP_API_URL + "/api/weather"

console.log(BASE_URL)

export const weatherApi = {
  async fetchCurrent(cityName: string) {
    const url = `${BASE_URL}/current/?q=${encodeURIComponent(cityName)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("現在の天気の取得に失敗しました")
    return await res.json()
  },

  async fetchForecast(cityName: string) {
    const url = `${BASE_URL}/forecast/?q=${encodeURIComponent(cityName)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("天気予報の取得に失敗しました")
    return await res.json()
  },
  async fetchForecast3h(cityName: string) {
    const url = `${BASE_URL}/forecast_3h/?q=${encodeURIComponent(cityName)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("天気予報の取得に失敗しました")
    return await res.json()
  }
}
