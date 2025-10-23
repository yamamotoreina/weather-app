// babel.config.js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env", // .envファイルを読み込む
          safe: false,
          allowUndefined: true
        }
      ]
    ]
  }
}
