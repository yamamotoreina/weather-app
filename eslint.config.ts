import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser, // Reactはブラウザで動くのでnode→browserへ変更
      parser: tseslint.parser, // TypeScriptパーサーを指定
      parserOptions: {
        project: ["./tsconfig.json"], // 型チェックを有効にしたい場合
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // React 17+では不要
      "@typescript-eslint/no-unused-vars": ["warn"]
    }
  }
])
