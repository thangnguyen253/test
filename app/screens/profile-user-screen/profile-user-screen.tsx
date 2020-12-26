import React from "react"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { View, ViewStyle, Image, TouchableOpacity, Alert, ScrollView } from "react-native"
import { Screen, Text } from "../../components"
import { useStores } from "../../models"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faArrowLeft,
  faSignOutAlt,
  faPenSquare,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./styles"
import { ProfileItem } from "./components/profileItem"
import { EDIT_PROFILE } from "../../constants"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  alignItems: "center",
}

export const ProfileUserScreen = observer(function ProfileUserScreen(props) {
  const { userStore } = useStores()
  const navigation = useNavigation()

  const handleSignOut = () => {
    userStore.signOut()
  }

  const handleEditProfile = () => {
    navigation.navigate(EDIT_PROFILE)
  }

  const handleChangeLanguage = () => {
    console.log("Change language")
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={styles.header}>
        <Text style={styles.headerName}>Me</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerView}>
          <Image
            source={
              userStore.avatar
                ? { uri: userStore.avatar }
                : require("./../../../assets/imgs/default-avatar.jpg")
            }
            style={styles.avatar}
          />
          <Text text={userStore.fullName} style={styles.fullName} />
          <View style={styles.profileItems}>
            <Text style={styles.section}>Profile</Text>
            <ProfileItem
              onClick={handleEditProfile}
              title={"Chỉnh sửa thông tin"}
              icon={<FontAwesomeIcon icon={faPenSquare} color={color.primary} size={30} />}
            />
            <Text style={styles.section}>Settings</Text>
            <ProfileItem
              onClick={handleChangeLanguage}
              title={"Thay đổi ngôn ngữ"}
              icon={<FontAwesomeIcon icon={faGlobeAmericas} color={color.primary} size={30} />}
            />
            <Text style={styles.section}>Account</Text>
            <ProfileItem
              onClick={handleSignOut}
              title={"Đăng xuất"}
              icon={<FontAwesomeIcon icon={faSignOutAlt} color={color.primary} size={30} />}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
})
