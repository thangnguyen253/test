import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { EDIT_PROFILE, PROFILE_USER } from "../constants"
import { ProfileUserScreen } from "../screens"
import { EditProfileScreen } from "../screens/edit-profile-screen/edit-profile-screen"

export type PrimaryParamList = {
  [PROFILE_USER]: undefined
  [EDIT_PROFILE]: undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()

export function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName={PROFILE_USER}
    >
      <Stack.Screen name={PROFILE_USER} component={ProfileUserScreen} />
      <Stack.Screen name={EDIT_PROFILE} component={EditProfileScreen} />
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
const exitRoutes = [PROFILE_USER]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
