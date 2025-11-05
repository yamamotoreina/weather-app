import { View, Text, StyleSheet } from "react-native"

type Props = {
  date: string
  temp: string
  humidity: string
}

export const InfoRow = ({ date, temp, humidity }: Props) =>{
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{date}</Text>
      <Text style={styles.text}>現在</Text>
      <Text style={styles.text}>気温: {temp}</Text>
      <Text style={styles.text}>湿度: {humidity}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 8,
    marginHorizontal: 24
  },
  text: {
    fontSize: 20
  }
})
