import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions
} from "react-native"

interface ForecastItem {
  time: string
  tempMax: number | null
  tempMin: number | null
  icon: string | null
  pop: number
}

interface Props {
  forecast_3h: ForecastItem[]
}

export default function Forecast3hList({ forecast_3h }: Props) {
  // nullのデータを除外
  const validForecasts = forecast_3h.filter(
    (item) => item.tempMax !== null && item.icon !== null
  )
  const { width } = useWindowDimensions()
  const isMobile = width <= 800

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { width: isMobile ? 320 : 480 }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {validForecasts.map((item) => (
            <View key={item.time} style={styles.card}>
              <Text style={styles.time}>{item.time}時</Text>
              {item.icon && (
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`
                  }}
                  style={styles.icon}
                />
              )}
              <Text style={styles.tempMax}>
                {Math.round(item.tempMax ?? 0)}°
              </Text>
              <Text style={styles.tempMin}>
                {Math.round(item.tempMin ?? 0)}°
              </Text>
              <Text style={styles.pop}> {item.pop}%</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  container: {
    alignSelf: "center", //親の中央
    paddingVertical: 24,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3, // Android shadow
  },
  scrollContent: {
    flexDirection: "row",
    marginHorizontal:16,
    justifyContent:"center",
    alignItems:"center"
  },
  card: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4
  },
  icon: {
    width: 50,
    height: 50
  },
  tempMax: {
    fontSize: 14,
    marginTop: 6,
    color: "red"
  },
  tempMin: {
    fontSize: 14,
    marginTop: 6,
    color: "blue"
  },
  pop: {
    fontSize: 12,
    color: "#555",
    marginTop: 2
  }
})
