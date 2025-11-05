const BASE_URL = "http://localhost:8000/api/weather";

export const weatherApi = {
  async fetchCurrent(cityName: string) {
    const res = await fetch(`http://127.0.0.1:8000/api/weather/current/${cityName}/`);
    if (!res.ok) throw new Error("現在の天気の取得に失敗しました");
    return res.json();
  },

  async getForecast(cityName:string) {
    const res = await fetch(`http://127.0.0.1:8000/api/weather/forecast/${cityName}/`);
    if (!res.ok) throw new Error("天気予報の取得に失敗しました");
    return await res.json();
  },
};
