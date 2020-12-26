import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { scaledSize } from "../../theme/sizing"

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
  sendMailBtn: {
    borderRadius: 24,
    height: 48,
    marginTop: 40,
    width: 274,
  },
  sendMailBtnTxt: {
    fontSize: 18,
  },
})

export const ForgotPasswordScreen = observer(function SignUpScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [email, setEmail] = useState("")

  const handleChangeEmail = (value) => {
    setEmail(value)
  }

  const handleSubmit = () => {
    console.log()
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <FontAwesomeIcon icon={faComments} color={color.primary} size={scaledSize(80)} />
      <View style={styles.inputContainersWrapper}>
        <View style={styles.inputContainer}>
          <TextField
            style={styles.inputField}
            placeholderTx="forgotPasswordScreen.enterEmail"
            textContentType="emailAddress"
            onChangeText={handleChangeEmail}
          />
        </View>
      </View>
      <Button
        tx="forgotPasswordScreen.sendMail"
        style={styles.sendMailBtn}
        textStyle={styles.sendMailBtnTxt}
        onPress={handleSubmit}
        preset="secondary"
      />
    </Screen>
  )
})
