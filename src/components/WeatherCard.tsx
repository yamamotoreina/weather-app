import { View, StyleSheet, Text, Image } from "react-native"

type Props = {
  location: string
  maxTemp: string
  minTemp: string
  rain: string
  icon: string
}

export default function WeatherCard({
  location,
  maxTemp,
  minTemp,
  rain,
  icon
}: Props) {
  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : null
  console.log("icon", icon)
  console.log("iconUrl:", iconUrl)
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.location}>{location}</Text>
      </View>

      <View style={styles.temp}>
        <View style={styles.tempIcon}>
          {iconUrl ? (
            <Image
              source={{ uri: iconUrl }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Text style={styles.fallbackIcon}>☀️</Text>
          )}
        </View>
        <View style={styles.tempRow}>
          <Text style={styles.maxTemp}>{maxTemp}</Text>
          <Text style={styles.minTemp}>{minTemp}</Text>
        </View>
      </View>

      <View style={styles.line} />
      <View style={styles.rainRow}>
        <Text style={styles.label}>降水確率</Text>
        <Text style={styles.value}>{rain}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center", //親の中央
    paddingVertical: 24,
    backgroundColor: "#fff",
    margin: 16,
    width: "80%",
    alignItems: "center",
    borderRadius: 20
  },
  item: {},
  location: {
    fontSize: 30
  },
  temp: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24
  },
  tempIcon: {
    marginHorizontal: 16
  },
  icon: {
  },
  fallbackIcon: {},
  tempRow: {
    marginTop: 16,
    alignItems: "center"
  },
  maxTemp: {
    color: "red",
    fontSize: 24
  },
  minTemp: {
    color: "blue",
    fontSize: 24
  },
  line: {
    borderBottomWidth: 1,
    width: 200,
    marginVertical: 10
  },
  rainRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center"
  },
  label: {
    fontSize: 20
  },
  value: {
    fontSize: 20
  }
})
