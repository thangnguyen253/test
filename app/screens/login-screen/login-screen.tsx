/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, ViewStyle, View } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { color } from "../../theme"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { scaledSize } from "../../theme/sizing"
import { useNavigation } from "@react-navigation/native"
import { FORGOT_PASSWORD } from "../../constants"
import { LoginButton, AccessToken } from "react-native-fbsdk"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const styles = StyleSheet.create({
  forgotPasswordBtn: {
    alignSelf: "flex-end",
    marginVertical: 12,
  },
  forgotPasswordTxt: {
    color: color.primaryLighter,
    fontSize: 13,
    fontWeight: "bold",
  },
  inputContainer: {
    borderBottomColor: color.primary,
    borderBottomWidth: 1,
    width: 274,
  },
  inputContainersWrapper: {
    paddingTop: 45,
  },
  inputField: {
    color: color.text,
    marginLeft: 0,
    paddingLeft: 0,
  },
  inputLabel: {
    color: color.primary,
    fontSize: 13,
    paddingTop: 20,
  },
  loginBtn: {
    borderRadius: 24,
    height: 48,
    width: 274,
  },
  loginBtnTxt: {
    fontSize: 18,
  },
  orUsing: {
    fontSize: 13,
    marginVertical: 15,
  },
})

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { userStore } = useStores()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigation = useNavigation()

  const handleChangeUsername = (value) => {
    setUsername(value)
  }

  const handleChangePassword = (value) => {
    setPassword(value)
  }

  const handleLogin = () => {
    userStore.login({ username, password })
  }

  return (
    <Screen style={ROOT} backgroundColor={color.background}>
      <FontAwesomeIcon icon={faComments} color={color.primary} size={scaledSize(80)} />
      <View style={styles.inputContainersWrapper}>
        <View style={styles.inputContainer}>
          <Text tx="loginScreen.username" style={styles.inputLabel} />
          <TextField
            style={styles.inputField}
            textContentType="nickname"
            placeholderTx="loginScreen.enterUsername"
            autoCapitalize="none"
            onChangeText={handleChangeUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text tx="loginScreen.password" style={styles.inputLabel} />
          <TextField
            style={styles.inputField}
            textContentType="password"
            placeholderTx="loginScreen.enterPassword"
            onChangeText={handleChangePassword}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
      </View>
      <View style={{ width: 248 }}>
        <Button
          preset="link"
          tx="loginScreen.forgotPassword"
          textStyle={styles.forgotPasswordTxt}
          style={styles.forgotPasswordBtn}
          onPress={() => {
            navigation.navigate(FORGOT_PASSWORD)
          }}
        />
      </View>
      <Button
        tx="loginScreen.login"
        style={styles.loginBtn}
        textStyle={styles.loginBtnTxt}
        onPress={handleLogin}
      />
      <Text tx="loginScreen.orUsing" preset="bold" style={styles.orUsing} />
      <View>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log("login has error: " + error)
              console.log(result)
            } else if (result.isCancelled) {
              console.log("login is cancelled.")
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data.accessToken.toString())
              })
            }
          }}
          onLogoutFinished={() => console.log("logout.")}
        />
      </View>
    </Screen>
  )
})
