import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { CHAT, MESSAGES } from "../constants"
import { ChatScreen, MessageScreen } from "../screens"

export type PrimaryParamList = {
  [MESSAGES]: undefined
  [CHAT]: undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()

export function MessagesNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName={MESSAGES}
    >
      <Stack.Screen name={MESSAGES} component={MessageScreen} />
      <Stack.Screen name={CHAT} component={ChatScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = [MESSAGES]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
