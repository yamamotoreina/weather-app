import React from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import Icons  from "react-native-vector-icons/Ionicons"

type Forecast = {
  date: string
  maxTemp: number
  minTemp: number
  rainChance: number
}

const forecastData: Forecast[] = [
  { date: "10/2", maxTemp: 29, minTemp: 15, rainChance: 30 },
  { date: "10/3", maxTemp: 29, minTemp: 15, rainChance: 30 },
  { date: "10/4", maxTemp: 29, minTemp: 15, rainChance: 30 },
  { date: "10/5", maxTemp: 29, minTemp: 15, rainChance: 30 },
  { date: "10/6", maxTemp: 29, minTemp: 15, rainChance: 30 }
]

export default function ForecastList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={forecastData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.date}>{item.date}</Text>
            < Icons
              name="weather-rainy"
              size={28}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.maxTemp}>{item.maxTemp}°C</Text>
            <Text style={styles.minTemp}>{item.minTemp}°C</Text>
            <Text style={styles.rain}>{item.rainChance}%</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6F5FF",
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  date: {
    fontSize: 16,
    width: 50
  },
  icon: {
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
    color: "#333",
    width: 50,
    textAlign: "right"
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 16
  }
})
