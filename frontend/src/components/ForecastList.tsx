import { ForecastDay } from "../types/weather"
import { View, Text, StyleSheet, Image } from "react-native"

type Props = {
  forecast: ForecastDay[]
}

export default function ForecastList ({ forecast }: Props) {
  const displayForecast =
    forecast && forecast.length > 0
      ? forecast.slice(0, 5)
      : [
          {
            date: new Date().toISOString(),
            description: "データなし",
            icon: null,
            rain: 0,
            tempMax: 0,
            tempMin: 0,
          },
        ];
  return (
    <View style={styles.container}>
      {displayForecast.map((item, index) => {
        const iconUrl = item.icon
          ? `https://openweathermap.org/img/wn/${item.icon}@2x.png`
          : null

        const dateObj = new Date(item.date);

        const weekdays = ["日", "月", "火", "水", "木", "金", "土"]
        const weekday = weekdays[dateObj.getDay()];

        const displayDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}（${weekday}）`

        return (
          <View key={item?.date ?? `empty-${index}`} style={styles.row}>
            <Text style={styles.date}>{displayDate ?? "--"}</Text>
            {iconUrl ? (
              <Image
                source={{ uri: iconUrl }}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.fallbackIcon}>☀️</Text>
            )}
            <Text style={styles.maxTemp}>{Math.round(item.tempMax ?? 0)}°C</Text>
            <Text style={styles.minTemp}>{Math.round(item.tempMin ?? 0)}°C</Text>
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
