import React, { FunctionComponent as Component, useState, useEffect } from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { BulletItem, Button, Header, Text, Screen, Wallpaper, TextField } from "../../components"
import { color, spacing } from "../../theme"
import { Api } from "../../services/api"
import { useStores } from "../../models"

const FULL: ViewStyle = { flex: 1, justifyContent: "center" }
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  justifyContent: "center",
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
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

export const HomeScreen: Component = observer(function HomeScreen() {
  const navigation = useNavigation()
  const { homeStore } = useStores()
  const [country, setCountry] = useState("India")
  const [isValidText, onValidText] = useState(false)
  const [isLoading, onLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      if (homeStore.countryData) {
        navigation.navigate("countryDetail")
      } else {
        Alert.alert("No Data Found.")
      }
      onLoading(false)
    }
  }, [homeStore.countryData])
  const goBack = () => navigation.goBack()

  const onSubmitPress = () => {
    onLoading(true)
    homeStore.getCountryDetail(country)
  }
  const onChangeText = text => {
    text ? onValidText(true) : onValidText(false)
    setCountry(text)
  }
  return (
    <View style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <TextField
          placeholderTx={"home.enterCountry"}
          onChangeText={onChangeText}
          value={country}
        />
        <Button
          disabled={!isValidText}
          isLoading={isLoading}
          style={[DEMO, !isValidText && { backgroundColor: color.palette.lightGrey }]}
          textStyle={DEMO_TEXT}
          tx="home.submit"
          onPress={onSubmitPress}
        />
      </Screen>
    </View>
  )
})
