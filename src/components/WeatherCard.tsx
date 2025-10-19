import { View, StyleSheet, Text } from "react-native"
import { JSX } from "react"

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
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.location}>{location}の天気</Text>
      </View>

      <View style={styles.temp}>
        <View style={styles.tempIcon}>
          <Text style={styles.icon}>{icon}</Text>
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
    flex: 1,
    paddingVertical: 24,
    backgroundColor:"#fff",
    margin:16,
    width:"80%",
    alignItems: "center",
     borderRadius: 20,
     
  },
  item: {

  },
  location: {
    fontSize: 30
  },
  temp: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24
  },
  tempIcon:{
    marginHorizontal:16
  },
  icon: {
    fontSize: 70
  },
  tempRow:{
    marginTop:16,
    alignItems:"center"
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
    marginVertical: 10,
  },
  rainRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center"
  },
  label: {
    fontSize: 20,
  },
  value: {
    fontSize: 20,
  }
})
