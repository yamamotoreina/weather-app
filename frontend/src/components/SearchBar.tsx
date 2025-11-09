import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"

interface SearchBarProps {
  onSearch: (city: string) => Promise<void> | void // ← 検索結果を返す関数
  loading?: boolean
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [city, setCity] = useState("")

  const handleSearch = async () => {
    const trimmed = city.trim()
    if (trimmed === "") return
    try {
      setCity("") // 入力リセットしたい場合
      await onSearch(trimmed) // 検索実行
    } catch (error) {
      console.error("検索エラー:", error)
    }
  }

  const { width } = useWindowDimensions()
  const isMobile = width <= 800
  const styles = createStyles(isMobile)

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="search"
        placeholderTextColor="#D8D8D8"
        onSubmitEditing={handleSearch}
        autoFocus={false} //自動でフォーカスされキーボードが表示される
      />

      {loading ? ( //ローディング中
        <ActivityIndicator size="small" color="#007AFF" />
      ) : (
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const createStyles = (isMobile) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#000",
      marginVertical: 32,
      borderRadius: 20,
      width: isMobile ? "80%" : 480 ,
      backgroundColor: "#fff"
    },
    input: {
      flex: 1,
      fontSize: 20,
      paddingLeft: 16,
      borderBottomEndRadius: "1px"
    },
    icon: {
      paddingRight: 16
    }
  })
