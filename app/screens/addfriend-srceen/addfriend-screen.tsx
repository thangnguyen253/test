/* eslint-disable react-native/no-color-literals */
import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  StyleSheet,
  ViewStyle,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
  TextInput,
  ScrollView,
} from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import _ from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faUserPlus, faUserFriends, faUserCheck } from "@fortawesome/free-solid-svg-icons"
import { color } from "../../theme"
import { scaledSize } from "../../theme/sizing"
import { searchUser } from "../../services/api/usersAPI"

const ROOT: ViewStyle = {
  position: "relative",
  flex: 1,
  alignItems: "center",
  // justifyContent: "center"
}

const FRIEND_STATUS = {
  FRIEND: 1,
  NOT_FRIEND: -1,
  REQUEST_SENT: 0,
}

const styles = StyleSheet.create({
  iconView: {
    alignItems: "center",
    backgroundColor: color.primary,
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
    left: 300,
    top: 20,
    width: 40,
  },
  inputText: {
    alignItems: "center",
    backgroundColor: color.backgroundSearch,
    borderColor: color.text,
    borderRadius: 18,
    borderWidth: 2,
    height: 40,
    // justifyContent: "center",
    width: "95%",
  },
  inputTextContent: {
    bottom: -8,
    fontSize: 15,
    position: "absolute",
    width: "95%",
  },
  inputView: {
    alignItems: "center",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 2,
    height: 60,
    justifyContent: "center",
    width: "100%",
  },
  messageUserAvatar: {
    borderRadius: 50,
    height: 55,
    left: 6,
    position: "absolute",
    top: 8,
    width: 55,
  },
  messageUserTextName: {
    color: color.text,
    fontFamily: "Geometria",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "bold",
    left: 71,
    lineHeight: 20,
    position: "absolute",
    top: 14,
  },
  messageUserTextUsername: {
    left: 71,
    position: "absolute",
    top: 36,
  },
  messageUserView: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 2,
    height: 77,
    position: "relative",
    width: 375,
  },
  userConstainer: {
    height: 597,
    position: "absolute",
    top: 58,
  },
})

function MessageUser(props) {
  const { user } = props
  const [isFriend, setIsFriend] = useState(user.isFriend)

  function handleIsFriend() {
    if (isFriend === FRIEND_STATUS.NOT_FRIEND) {
      setIsFriend(FRIEND_STATUS.REQUEST_SENT)
      user.isFriend = FRIEND_STATUS.REQUEST_SENT
    }
  }

  return (
    <View style={styles.messageUserView}>
      <Text style={styles.messageUserTextName}>{user.fullName}</Text>
      <Text style={styles.messageUserTextUsername}>{user.username}</Text>
      <Image
        source={
          user.avatar ? { uri: user.avatar } : require("../../../assets/imgs/default-avatar.jpg")
        }
        style={styles.messageUserAvatar}
      />
      <View style={styles.iconView}>
        <TouchableOpacity onPress={handleIsFriend}>
          <IconIsFriend isFriend={isFriend} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

function IconIsFriend(prop) {
  const isFriend = prop.isFriend
  if (isFriend === FRIEND_STATUS.FRIEND) {
    return (
      <FontAwesomeIcon
        icon={faUserFriends}
        color={"#ffffff"}
        size={scaledSize(25)}
      ></FontAwesomeIcon>
    )
  }
  if (isFriend === FRIEND_STATUS.NOT_FRIEND) {
    return (
      <FontAwesomeIcon icon={faUserPlus} color={"#ffffff"} size={scaledSize(25)}></FontAwesomeIcon>
    )
  } else {
    return (
      <FontAwesomeIcon icon={faUserCheck} color={"#ffffff"} size={scaledSize(25)}></FontAwesomeIcon>
    )
  }
}

export const AddFriendScreen = observer(function AddFriendSrceen() {
  const [userList, setUserList] = useState([])

  const search = _.debounce(async (query) => {
    const response = await searchUser(query)
    setUserList(response.data)
  }, 300)

  const handleSearchChange = (username: string) => {
    search(username)
  }

  return (
    <Screen style={ROOT}>
      <View style={styles.inputView}>
        <View style={styles.inputText}>
          <TextInput
            style={styles.inputTextContent}
            placeholder="Tìm kiếm bạn bè bằng tên người dùng"
            onChangeText={handleSearchChange}
          ></TextInput>
        </View>
      </View>
      <View style={styles.userConstainer}>
        <FlatList
          data={userList}
          renderItem={({ item }) => <MessageUser user={item} />}
          keyExtractor={(item) => `${item._id}`}
        />
      </View>
    </Screen>
  )
})
