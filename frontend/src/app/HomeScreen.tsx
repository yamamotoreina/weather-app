import { ActivityIndicator, ScrollView } from "react-native"
import Header from "../components/Header"
import ForecastList from "../components/ForecastList"
import { useWeatherSearch } from "../hooks/useWeatherSearch"
import { InfoRow } from "../components/InfoRow"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/WeatherCard"
import Forecast3hList from "../components/Forecast3hList"

export const HomeScreen = () => {
  const { current, forecast, loading, forecast3h, searchWeather } = useWeatherSearch()
  
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
      <Forecast3hList forecast_3h={forecast3h}/>
      <ForecastList forecast={forecast} />
    </ScrollView>
  )
}
