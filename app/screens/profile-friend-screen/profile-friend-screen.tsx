import React from "react"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { View, ViewStyle, Image, TouchableOpacity, ScrollView } from "react-native"
import { Screen, Text } from "../../components"
import { useStores } from "../../models"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./styles"
import { ProfileItem } from "./components/profileItem"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  alignItems: "center",
}

export const ProfileFriendScreen = observer(function ProfileFriendScreen(props) {
  const { navigationStore } = useStores()

  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        </TouchableOpacity>

        <Text style={styles.headerName}>
          {navigationStore.profileFriendScreenParams.user.info.fullName}
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerView}>
          <Image
            source={
              navigationStore.profileFriendScreenParams.user.info.avatar
                ? { uri: navigationStore.profileFriendScreenParams.user.info.avatar }
                : require("./../../../assets/imgs/default-avatar.jpg")
            }
            style={styles.avatar}
          />
          <Text
            text={navigationStore.profileFriendScreenParams.user.info.fullName}
            style={styles.fullName}
          />
          <View style={styles.profileItems}>
            <Text style={styles.section}>Profile</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
})
