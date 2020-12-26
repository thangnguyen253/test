import React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { scaledSize } from "../../theme/sizing"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
}

const styles = StyleSheet.create({
  appName: {
    color: color.primary,
    fontSize: scaledSize(30),
    fontWeight: "bold",
    margin: spacing[1]
  },
})

export const SplashScreen = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} backgroundColor={ color.background }>
      <FontAwesomeIcon icon={faComments} color={color.primary} size={scaledSize(80)} />
      <Text text="Chit Chat" style={styles.appName}/>
    </Screen>
  )
}
