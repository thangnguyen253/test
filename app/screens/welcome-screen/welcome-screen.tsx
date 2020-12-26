import React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, ViewStyle, View } from "react-native"
import { Button, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { scaledSize } from "../../theme/sizing"
import { useNavigation } from "@react-navigation/native"
import { LOGIN, SIGN_UP } from "../../constants"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const styles = StyleSheet.create({
  appName: {
    color: color.primary,
    fontSize: scaledSize(30),
    fontWeight: "bold",
    margin: spacing[1],
  },
  buttonsContainer: {
    height: 116,
    justifyContent: "space-between",
    marginTop: 70,
    width: 274,
  },
  loginBtn: {
    borderRadius: 24,
    height: 48,
  },
  loginBtnTxt: {
    fontSize: 18,
  },
  signUpBtn: {
    borderRadius: 24,
    height: 48,
  },
  signUpBtnTxt: {
    fontSize: 18,
  },
})

export const WelcomeScreen = observer(function WelcomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} backgroundColor={color.background}>
      <FontAwesomeIcon icon={faComments} color={color.primary} size={scaledSize(80)} />
      <Text text="Chit Chat" style={styles.appName} />
      <View style={styles.buttonsContainer}>
        <Button
          tx="welcomeScreen.signUp"
          preset="secondary"
          style={styles.signUpBtn}
          textStyle={styles.signUpBtnTxt}
          onPress={() => {
            navigation.navigate(SIGN_UP)
          }}
        />
        <Button
          tx="welcomeScreen.login"
          style={styles.loginBtn}
          textStyle={styles.loginBtnTxt}
          onPress={() => {
            navigation.navigate(LOGIN)
          }}
        />
      </View>
    </Screen>
  )
})
