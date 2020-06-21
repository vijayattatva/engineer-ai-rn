import React, { FunctionComponent as Component, useState, useEffect } from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { BulletItem, Button, Header, Text, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

const FULL: ViewStyle = { flex: 1, justifyContent: "center" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  flex: 1,
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
  marginTop: 20,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  height: 55,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 18,
  color: color.palette.black,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
}
const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}
const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
}
const LABEL: TextStyle = {
  flex: 1,
}

const ROW: ViewStyle = { flexDirection: "row", marginTop: 10 }

export const CountryDetail: Component = observer(function CountryDetail() {
  const navigation = useNavigation()
  const { homeStore } = useStores()
  const { countryData } = homeStore
  const [isLoading, onLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)
  const goBack = () => navigation.goBack()

  useEffect(() => {
    if (isLoading) {
      if (homeStore.weatherDetail) {
        setWeatherData(homeStore.weatherDetail)
      } else {
        Alert.alert("No Data Found.")
      }
      onLoading(false)
    }
  }, [homeStore.weatherDetail])
  const onWeatherPress = () => {
    homeStore.getWeatherDetail(countryData.capital)
    onLoading(true)
  }

  const renderRows = (label, value) => {
    return (
      <View style={ROW}>
        <Text style={LABEL} preset={"bold"} tx={label} />
        <Text style={LABEL} preset={"bold"} text={value} />
      </View>
    )
  }

  return (
    <View style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="home.detail"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />

        <View style={FULL}>
          {renderRows("home.capital", countryData.capital)}
          {renderRows("home.population", countryData.population)}
          {renderRows("home.latlng", countryData.latlng[0] + ", " + countryData.latlng[1])}
          {weatherData && (
            <View>
              <Text style={LABEL} preset={"bold"} tx={"home.weatherInfo"} />
              {renderRows("home.temp", weatherData.current.temperature)}
              {renderRows("home.wind", countryData.current.wind_speed)}
              {renderRows("home.precip", countryData.current.precip)}
            </View>
          )}
          <View style={ROW}>
            <Text style={LABEL} preset={"bold"} tx={"home.flag"} />
            <Image
              resizeMode={"contain"}
              style={{ height: 30, width: 30 }}
              source={{ uri: countryData.flag }}
            />
          </View>
          <Button
            style={DEMO}
            isLoading={isLoading}
            textStyle={DEMO_TEXT}
            tx="home.capitalWeather"
            onPress={onWeatherPress}
          />
        </View>
      </Screen>
    </View>
  )
})
