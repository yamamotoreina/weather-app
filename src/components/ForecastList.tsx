import { ForecastDay } from "@/types/weather"
import React from "react"
import { View, Text, StyleSheet, FlatList, Image } from "react-native"

type Props = {
  forecast: ForecastDay[]
}

export default function ForecastList({ forecast }: Props) {
  if (!forecast || forecast.length === 0) return null

  return (
    <View style={styles.container}>
      <FlatList
        data={forecast}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.icon}@2x.png`
          return (
            <View style={styles.row}>
              <Text style={styles.date}>{item.date}</Text>
              {iconUrl ? (
                <Image
                  source={{ uri: iconUrl }}
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <Text style={styles.fallbackIcon}>☀️</Text>
              )}
              <Text style={styles.maxTemp}>{Math.round(item.tempMax)}°C</Text>
              <Text style={styles.minTemp}>{Math.round(item.tempMax)}°C</Text>
              <Text style={styles.rain}>{item.rain}%</Text>
            </View>
          )
        }}
      />
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
