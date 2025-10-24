# weather-app
## 概要
React Native と TypeScript、 SQLiteを使ったOpenWeatherMap.Apiから天気情報を取得する天気予報アプリです。

## インストール
1. Android アプリのインストール方法
  以下から APK をダウンロードしてインストールできます。
   [Android 用インストール URL]
https://expo.dev/accounts/reina-yamamopto/projects/MemoApp/builds/2d548016-663c-49f8-bdbf-57bc4c8cb102
端末にコピーして実行するとインストールされます。
  ※ 「提供元不明のアプリ」を許可する必要があります。

## 主な機能
### 検索
都道府県と主要都市を独自のJSONで緯度経度を予め格納、そこから緯度経度を使用してAPIで検索できる。
### 天気
現在の天気とそこから5日間の天気を取得
取得情報はcurrentweather/forecastwastherに分けて管理することで、欲しい情報をインポートしやすくした
### オフライン対応
SQliteに最新データを保管することでオフライン時でも1度検索したデータなら再表示可能
### 更新
一定時間経過でのみ、新しいデータを再取得
###検索結果
過去に検索した都市を履歴テーブルに保存
## プロジェクト構成
その他の地域も追加実装可能。
DBで取得した情報を管理
地域を検索すると天気情報が出る
検索バー→JSONで経度緯度に変換→APIに渡してデータを取得
## 使用技術
React Native(Expo)
Typescript
OpenWeatherMap API
SQLite
Axios


SQLiteは名前のとおり、簡易的な（ライトな）データベースであり、サーバーとしてではなくアプリケーションに組み込むことで利用

## 運用
デプロイはしていません。ローカルと ExpoGo にて動作確認。
android 版は Expo EAS Build で生成した.apk を配布しています。
ブランチ運用
main:完了済みコード
develop: 環境構築・ビルド用ブランチ
develop/ui-structure:開発用ブランチ


## アーキテクチャ概要

[SearchBar] → [weatherService] → [OpenWeatherMap API]
     ↓                         　　　　　　　　  ↑
 [SQLite 保存] ←　　　　 [weatherRepository] ← [DB]
     ↓
 [WeatherCard / ForecastList 表示]

weatherService.ts
APIと位置情報サービスを統合し、アプリデータに整形
weatherRepository.ts
最新転機と履歴の２テーブル構成でキャッシュ対応
useweatherSearch.ts
カスタムフックでロジックとUIを分離

## セットアップ方法
```bash
git clone ...
npm install
npm start

## 追加予定の機能
ファイルを都道府県ごとに分割して軽量化
座標を公式データへの差し替えは必要に応じて追加する
正確な市町村の追加はGeocoding APIの追加も検討（JSONだと重くなるため）

## DB構成(SQLite)
カラム	型	説明
city	TEXT	都市名（主キー）
prefecture	TEXT	都道府県名
temp	REAL	現在気温
tempMax / tempMin	REAL	最高・最低気温
rain	REAL	簡易降水確率
icon	TEXT	天気アイコン
humidity	REAL	湿度
windSpeed	REAL	風速
updatedAt	TEXT	更新日時
		
カラム	型	説明
id	INTEGER	主キー
city	TEXT	都市名
temp	REAL	検索時の気温
icon	TEXT	天気アイコン
updatedAt	TEXT	検索時刻

