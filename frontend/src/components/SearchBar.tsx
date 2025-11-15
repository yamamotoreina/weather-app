import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  FlatList,
  Text
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect, useCallback } from "react"
import { useWeatherSearch } from "../hooks/useWeatherSearch"

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"

interface SearchBarProps {
  onSearch: (city: string) => Promise<void> | void // 検索結果を返す関数
  loading?: boolean
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [city, setCity] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1) // 現在選択中の候補
  const { searchWeather } = useWeatherSearch()

  // 入力変更で候補取得
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (city.length > 1) {
        try {
          setFetching(true)
          const url = `${BASE_URL}/api/weather/autocomplete/?q=${encodeURIComponent(
            city
          )}`
          const res = await fetch(url)
          const data = await res.json()
          setSuggestions(data)
          setShowSuggestions(true)
        } catch (err) {
          console.error("候補取得エラー:", err)
        } finally {
          setFetching(false)
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)
    return () => clearTimeout(delayDebounce)
  }, [city])

  // 検索確定
  const handleSearch = useCallback(
    async (selected?: string) => {
      const trimmed = selected || city.trim()
      if (trimmed === "") return
      setShowSuggestions(false)
      await onSearch(trimmed)
      await searchWeather(trimmed)
      setCity(trimmed)
    },
    [city, onSearch, searchWeather]
  )

  // 🔽 キーボード操作対応
  const handleKeyPress = useCallback(
    (e: any) => {
      if (!showSuggestions || suggestions.length === 0) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (highlightIndex >= 0 && suggestions[highlightIndex]) {
          handleSearch(suggestions[highlightIndex].label)
        } else {
          handleSearch(city)
        }
      }
    },
    [highlightIndex, suggestions, handleSearch, city, showSuggestions]
  )

  const { width } = useWindowDimensions()
  const isMobile = width <= 800
  const styles = createStyles(isMobile)

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={(text) => {
            setCity(text)
            setHighlightIndex(-1)
          }}
          placeholder="search"
          placeholderTextColor="#D8D8D8"
          onKeyPress={handleKeyPress}
          onSubmitEditing={() => handleSearch()}
          autoFocus={false}
        />

        {loading || fetching ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : (
          <TouchableOpacity onPress={() => handleSearch()}>
            <Ionicons name="search" size={24} color="#000" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <FlatList
          style={styles.suggestions}
          data={suggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSearch(item.label)}
              style={[
                styles.suggestionItem,
                highlightIndex === index && styles.highlightedItem
              ]}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}


const createStyles = (isMobile) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      alignItems: "center",
      marginVertical: 32,
      borderRadius: 20,
      backgroundColor: "#fff"
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      width: isMobile ? "100%" : 480,
      paddingHorizontal: 8,
      borderRadius: 20,
      backgroundColor: "#fff"
    },
    input: {
      flex: 1,
      fontSize: 20,
      paddingLeft: 16,
    },
    icon: {
      paddingRight: 16
    },
    suggestions: {
      backgroundColor: "#fff",
      marginTop: 4,
      maxHeight: 200
    },
    suggestionItem: {
      padding: 10,
      borderBottomColor: "#eee"
    },
    highlightedItem: {
      backgroundColor: "#fff"
    }
  })
