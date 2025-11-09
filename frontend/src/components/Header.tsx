import { View, StyleSheet, Text } from "react-native"
import { JSX } from "react"

const Header = (): JSX.Element => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Weather App</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    width: "100%",         // 横いっぱいに広げる
    backgroundColor: "#1E90FF",
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,              // 念のため余白をリセット
    paddingHorizontal: 0,   // 横パディング削除
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    paddingVertical: 32,
    paddingHorizontal: 27
  }
})
export default Header
