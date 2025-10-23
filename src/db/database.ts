import * as SQLite from "expo-sqlite"

// 同期的にDBを開く（新API）
export const db = SQLite.openDatabaseSync("weather.db")

// 初期化関数（テーブル作成など）
export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS weather_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT,
      prefecture TEXT,
      temp INTEGER,
      description TEXT,
      updatedAt INTEGER
    );
  `)

  db.execSync(`
    CREATE TABLE IF NOT EXISTS latest_weather (
      city TEXT PRIMARY KEY,
      prefecture TEXT,
      temp INTEGER,
      description TEXT,
      updatedAt INTEGER
    );
  `)
}
