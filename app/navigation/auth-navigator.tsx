import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { FORGOT_PASSWORD, LOGIN, SIGN_UP, WELCOME } from "../constants"
import { SignUpScreen, WelcomeScreen, LoginScreen, ForgotPasswordScreen } from "../screens"

export type PrimaryParamList = {
  [WELCOME]: undefined
  [LOGIN]: undefined
  [SIGN_UP]: undefined
  [FORGOT_PASSWORD]: undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName={WELCOME}
    >
      <Stack.Screen name={WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      <Stack.Screen name={SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
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
const exitRoutes = [WELCOME]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
