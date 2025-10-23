//型定義
//現在の天気情報
export type CurrentWeather = {
  city: string;
  prefecture: string;
  date: string;
  temp: number;
  tempMax: number;
  tempMin: number;
  rain: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  lat: number;
  lon: number;
  updatedAt: string
};

export type ForecastDay = {
  date: string;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
  rain: number;

};