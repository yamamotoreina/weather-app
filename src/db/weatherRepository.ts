import * as SQLite from "expo-sqlite"
import type { CurrentWeather } from "../types/weather"

// ✅ DB初期化（シングルトン）
const db = SQLite.openDatabaseSync("weather.db")

db.execSync(`
CREATE TABLE IF NOT EXISTS weather_latest (
  city TEXT PRIMARY KEY,
  prefecture TEXT,
  temp REAL,
  tempMax REAL,
  tempMin REAL,
  rain REAL,
  description TEXT,
  icon TEXT,
  humidity REAL,
  windSpeed REAL,
  lat REAL,
  lon REAL,
  updatedAt TEXT
);

CREATE TABLE IF NOT EXISTS weather_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT,
  prefecture TEXT,
  temp REAL,
  icon TEXT,
  updatedAt TEXT
);
`)

// ---- 最新天気を保存（都市ごとに上書き） ----
export function saveLatestWeather(data: CurrentWeather) {
  db.runSync(
    `REPLACE INTO weather_latest 
     (city, prefecture, temp, tempMax, tempMin, rain, description, icon, humidity, windSpeed, lat, lon, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.city,
      data.prefecture,
      data.temp,
      data.tempMax,
      data.tempMin,
      data.rain,
      data.description,
      data.icon,
      data.humidity,
      data.windSpeed,
      data.lat,
      data.lon,
      data.updatedAt ?? new Date().toISOString(),
    ]
  )
}

// ---- 検索履歴を保存 ----
export function saveToHistory(data: CurrentWeather) {
  db.runSync(
    `INSERT INTO weather_history (city, prefecture, temp, icon, updatedAt)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.city,
      data.prefecture,
      data.temp,
      data.icon,
      new Date().toISOString(),
    ]
  )
}

// ---- 履歴一覧を取得（最新順）----
export function getHistory(): {
  id: number
  city: string
  prefecture: string
  temp: number
  icon: string
  updatedAt: string
}[] {
  return db.getAllSync<{
    id: number
    city: string
    prefecture: string
    temp: number
    icon: string
    updatedAt: string
  }>(`SELECT * FROM weather_history ORDER BY updatedAt DESC`)
}

// ---- 最新天気を取得 ----
export function getLatest(city: string): CurrentWeather | null {
  const result = db.getFirstSync<CurrentWeather>(
    `SELECT * FROM weather_latest WHERE city = ?`,
    [city]
  )
  return result ?? null
}

// ---- 🔹検索履歴（最新10件・重複除外）----
export function getSearchHistory(): string[] {
  const result = db.getAllSync<{ city: string }>(
    `SELECT DISTINCT city FROM weather_history ORDER BY updatedAt DESC LIMIT 10`
  )
  return result.map((r) => r.city)
}
