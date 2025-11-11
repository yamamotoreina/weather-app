# weather-app
## 概要
フロントはReact/TypeScript、バックエンドはPython/Django、DBはMySQLを使用。
OpenWeatherMap.Apiから天気情報を取得する天気予報アプリです。

## Docker方法
### 1. GitHub からクローン
git clone <repo-url>
cd backend

### 2. backend/.env 作成
cp backend/.env.example backend/.env

### 3. Docker Compose 起動
docker compose up --build

### 4. コンテナ削除・データベース含め完全削除
docker compose down
docker compose down -v
 
## 主な機能

### 検索
都道府県と主要都市をDBで緯度経度を予め格納、そこから緯度経度を使用してAPIで検索できる。
前回の都市名(1件)をDBで保存しているためリロードされても検索は保持される。

### 天気
現在の天気とその日の3時間ごとの天気を横スクロールで表示。週間予報として5日間の天気を取得している。
取得情報はcurrentweather/forecastwastherに分けて管理することで、欲しい情報をインポートしやすくした。

## プロジェクト構成
その他の地域も追加実装可能。
DBで取得した情報を管理
地域を検索すると天気情報が出る
検索バー→JSONで経度緯度に変換→APIに渡してデータを取得

## 通信の仕組み
React と Django は Docker 内ネットワークで接続されています。
| 通信方向        | 使用URL                            |
| ----------- | -------------------------------- |
| フロント → バック  | `http://backend:8000` （Docker 内） |
| ブラウザ → フロント | `http://localhost:8081`          |

## アクセス方法
[フロントエンド] (http://localhost:8081/)
[Django API] (http://localhost:8000/api/weather/)

## 使用技術
React Native(Expo)
Typescript
Python
Django
Docker
OpenWeatherMap API
MySQL

フロントエンドとバックエンドを分けて実装することで可読性・再利用性を高めた。

## 運用
## Docker構造
mysql-db
django-app
react-app
各コンテナは app-network で接続されます。

## DB構成(PostgreSQL)
### WeatherHistory（天気の履歴）
| カラム名       | 型             | 説明                     |
|----------------|----------------|--------------------------|
| id             | AutoField       | 自動採番ID（Django標準） |
| city           | CharField(100)  | 都市名                    |
| prefecture     | CharField(100)  | 都道府県（任意）          |
| date           | DateField       | 日付                      |
| temp           | FloatField      | 気温（℃）                 |
| temp_max       | FloatField      | 最高気温（℃）             |
| temp_min       | FloatField      | 最低気温（℃）             |
| rain           | IntegerField    | 降水量（mm）              |
| description    | CharField(200)  | 天気の説明                 |
| icon           | CharField(50)   | 天気アイコンコード         |
| humidity       | IntegerField    | 湿度（%）                 |
| wind_speed     | FloatField      | 風速（m/s）               |
| lat            | FloatField      | 緯度                       |
| lon            | FloatField      | 経度                       |
| updated_at     | DateTimeField   | 更新日時（自動更新）       |

### City（市町村）
| カラム名      | 型             | 説明                                           |
|---------------|----------------|----------------------------------------------|
| id            | AutoField       | 自動採番ID                                     |
| name          | CharField(100)  | 市区町村フル名（ユニーク）                     |
| prefecture    | CharField(50)   | 都道府県（任意）                               |
| city          | CharField(50)   | 市単体（任意）                                 |
| ward          | CharField(50)   | 区（任意）                                     |
| town          | CharField(100)  | 町丁目（任意）                                 |
| latitude      | FloatField      | 緯度                                           |
| longitude     | FloatField      | 経度                                           |
| parent_id     | ForeignKey      | 親のCity（都道府県または市）への参照（任意） |

### LastCity（直近選択都市）
| カラム名 | 型            | 説明     |
|----------|---------------|----------|
| id       | AutoField      | 自動採番ID |
| name     | CharField(100) | 都市名    |

## 補足
・ .env ファイルは GitHub には含めず、必要なキーを backend/.env.example で共有します。

