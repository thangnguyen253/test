/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { scaledSize } from "../../theme/sizing"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { WELCOME } from "../../constants"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: color.primary,
    borderBottomWidth: 1,
    width: 274,
  },
  inputContainersWrapper: {
    height: scaledSize(200),
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
  signUpBtn: {
    borderRadius: 24,
    height: 48,
    marginTop: 40,
    width: 274,
  },
  signUpBtnTxt: {
    fontSize: 18,
  },
})

export const SignUpScreen = observer(function SignUpScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { userStore } = useStores()
  const navigation = useNavigation()

  // Form states
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleChangeUsername = (value) => {
    setUsername(value)
  }

  const handleChangeEmail = (value) => {
    setEmail(value)
  }

  const handleChangePassword = (value) => {
    setPassword(value)
  }

  const handleChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleSignUp = () => {
    userStore.register({ username, password, email })
    navigation.navigate(WELCOME)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <FontAwesomeIcon icon={faComments} color={color.primary} size={scaledSize(80)} />
      <View style={styles.inputContainer}>
        <Text tx="signUpScreen.username" style={styles.inputLabel} />
        <TextField
          style={styles.inputField}
          textContentType="nickname"
          placeholderTx="signUpScreen.enterUsername"
          onChangeText={handleChangeUsername}
          autoCapitalize="none"
        />
      </View>
      {/* <View style={styles.inputContainer}>
          <Text tx="signUpScreen.fullName" style={styles.inputLabel} />
          <TextField
            style={styles.inputField}
            textContentType="nickname"
            placeholderTx="signUpScreen.enterFullName"
            onChangeText={handleChangeUsername}
          />
        </View> */}
      <View style={styles.inputContainer}>
        <Text tx="signUpScreen.fullName" style={styles.inputLabel} />
        <TextField
          style={styles.inputField}
          textContentType="nickname"
          placeholderTx="signUpScreen.enterFullName"
          onChangeText={handleChangeUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text tx="signUpScreen.email" style={styles.inputLabel} />
        <TextField
          style={styles.inputField}
          placeholderTx="signUpScreen.enterEmail"
          textContentType="emailAddress"
          autoCapitalize="none"
          onChangeText={handleChangeEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text tx="signUpScreen.password" style={styles.inputLabel} />
        <TextField
          style={styles.inputField}
          placeholderTx="signUpScreen.enterPassword"
          textContentType="password"
          autoCapitalize="none"
          onChangeText={handleChangePassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text tx="signUpScreen.confirmPassword" style={styles.inputLabel} />
        <TextField
          style={styles.inputField}
          placeholderTx="signUpScreen.enterConfirmPassword"
          textContentType="password"
          autoCapitalize="none"
          onChangeText={handleChangeConfirmPassword}
          secureTextEntry
        />
      </View>
      <Button
        tx="signUpScreen.signUp"
        style={styles.signUpBtn}
        textStyle={styles.signUpBtnTxt}
        onPress={handleSignUp}
        preset="secondary"
      />
    </Screen>
  )
})
