import { View, StyleSheet,ActivityIndicator } from "react-native"
import { JSX } from "react"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import InfoRow from "../components/InfoRow"
import WeatherCard from "../components/WeatherCard"
import ForecastList from "../components/ForecastList"
import { useWeatherSearch } from "../hooks/useWeatherSearch"

export const HomeScreen = () => {
  const { current, forecast, loading,searchWeather} = useWeatherSearch()
  return (
    <View style={styles.container}>
      <Header />
      <SearchBar onSearch={searchWeather} />
      {loading && <ActivityIndicator size="large"/>}
      {current && (
        
      )}
      <InfoRow date={"10/1"} temp={"22℃"} humidity={"60%"} />
      <WeatherCard
        location="福岡県"
        maxTemp="12°C"
        minTemp="3°C"
        rain="10%"
        icon="⛅"
      />
      <ForecastList/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  }
})

