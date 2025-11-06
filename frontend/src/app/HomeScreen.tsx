import { ActivityIndicator, ScrollView, View, Text } from "react-native"
import Header from "../components/Header"
import ForecastList from "../components/ForecastList"
import { useWeatherSearch } from "../hooks/useWeatherSearch"
import { InfoRow } from "../components/InfoRow"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/WeatherCard"

export const HomeScreen = () => {
  const { current, forecast, loading, searchWeather } = useWeatherSearch()
  console.log("✅ HomeScreen forecast:", forecast)

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center", // ✅ stretch防止
        justifyContent: "flex-start"
      }}
      style={{ flex: 1, backgroundColor: "#ccecff" }}
    >
      <Header />
      <SearchBar onSearch={(city) => searchWeather(city)} loading={loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {current && (
        <InfoRow
          date={current.date}
          temp={`${current.temp}℃`}
          humidity={`${current.humidity}%`}
        />
      )}

      {/* 現在の天気 */}
      <WeatherCard
        location={
          current
            ? `${current.prefecture ?? ""}${
                current.city ? " " + current.city : ""
              } の天気`
            : "天気を検索"
        }
        maxTemp={`${current?.tempMax ?? "--"}°C`}
        minTemp={`${current?.tempMin ?? "--"}°C`}
        rain={`${current?.rain ?? 0}%`}
        icon={`${current?.icon ?? "☀️"}`}
      />
      <ForecastList forecast={forecast} />
    </ScrollView>
  )
}
