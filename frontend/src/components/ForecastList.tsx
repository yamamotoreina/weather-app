import { ForecastDay } from "../types/weather"
import { View, Text, StyleSheet, Image } from "react-native"

type Props = {
  forecast: ForecastDay[]
}

export default function ForecastList({ forecast }: Props) {
  if (!forecast || forecast.length === 0) return null
  console.log("ForecastListレンダリング:", forecast?.length)


  return (
    <View style={styles.container}>
      {forecast.map((item) => {
        const iconUrl = item.icon
          ? `https://openweathermap.org/img/wn/${item.icon}@2x.png`
          : null

        const date = new Date(item.date)
        const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][
          date.getDay()
        ]
        const displayDate = `${date.getMonth() + 1}/${date.getDate()}(${dayOfWeek})`

        return (
          <View key={item.date} style={styles.row}>
            <Text style={styles.date}>{displayDate}</Text>
            {iconUrl ? (
              <Image
                source={{ uri: iconUrl }}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.fallbackIcon}>☀️</Text>
            )}
            <Text style={styles.maxTemp}>{Math.round(item.tempMax)}°C</Text>
            <Text style={styles.minTemp}>{Math.round(item.tempMin)}°C</Text>
            <Text style={styles.rain}>{item.rain ?? 0}%</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    paddingVertical: 16,
    width:"80%",
    marginBottom:32
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    marginHorizontal: 16
  },
  date: {
    fontSize: 16,
  },
  fallbackIcon: {
    width: 30
  },
  maxTemp: {
    fontSize: 16,
    color: "red",
    width: 50,
    textAlign: "right"
  },
  minTemp: {
    fontSize: 16,
    color: "blue",
    width: 50,
    textAlign: "right"
  },
  rain: {
    fontSize: 16,
    color: "#000",
    width:60,
    textAlign: "right"
  }
})
