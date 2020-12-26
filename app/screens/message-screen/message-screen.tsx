/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react"
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
} from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faCamera,
  faComment,
  faThumbtack,
  faEllipsisH,
  faCheck,
} from "@fortawesome/free-solid-svg-icons"
import { color } from "../../theme"
import { scaledSize } from "../../theme/sizing"
import { State } from "react-powerplug"
import { renderOnly } from "@storybook/addon-storyshots"
import { createInstanceofPredicate } from "mobx/lib/internal"
import { construct } from "ramda"
import { setInternetCredentials } from "react-native-keychain"
import { useStores } from "../../models"
import { CHAT } from "../../constants"

const ROOT: ViewStyle = {
  position: "relative",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
}

const SEEN = 0

const styles = StyleSheet.create({
  gimView: {
    height: 52,
    left: 122,
    position: "absolute",
    top: 14,
    width: 25,
  },
  iconUnRead: {
    left: 13,
    top: 1,
  },
  messageContainer: {
    height: 597,
    position: "absolute",
    top: 85,
  },
  messageHeader: {
    alignItems: "center",
    backgroundColor: color.background,
    borderBottomColor: color.backgroundSearch,
    borderBottomWidth: 2,
    height: 85,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  // messageImage: {
  //   bottom: 32,
  //   left: 16,
  //   position: "absolute",
  // },
  // messageOption: {
  //   // borderBottomColor:"#E2E2E2",
  //   borderBottomWidth: 2,
  //   height: 77,
  //   position: 'relative',
  //   width:"100%"
  // },
  messageText: {
    color: color.text,
    fontFamily: "Roboto",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "normal",
    justifyContent: "center",
    lineHeight: 22,
    position: "absolute",
    textAlign: "center",
  },
  messageUser: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 2,
    height: 77,
    position: "relative",
    width: 375,
  },
  messageUserAvatar: {
    borderRadius: 50,
    height: 55,
    left: 6,
    position: "absolute",
    top: 8,
    width: 55,
  },
  messageUserLastTime: {
    fontFamily: "Roboto",
    fontSize: 14,
    left: 309,
    lineHeight: 17,
    position: "absolute",
    textAlign: "center",
    top: 12,
  },
  messageUserOptionLastTime: {
    fontFamily: "Roboto",
    fontSize: 14,
    lineHeight: 17,
    position: "absolute",
    right: 293,
    textAlign: "center",
    top: 17,
  },
  messageUserText: {
    color: color.text,
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    left: 71,
    lineHeight: 18,
    position: "absolute",
    top: 39,
  },
  messageUserTextName: {
    color: color.text,
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "bold",
    left: 71,
    lineHeight: 20,
    position: "absolute",
    top: 14,
  },
  moreText: {
    color: color.text,
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: 21,
    position: "absolute",
    textAlign: "center",
    top: 21,
  },
  moreView: {
    height: 42,
    left: 207,
    position: "absolute",
    top: 20,
    width: 35,
  },
  optionView: {
    backgroundColor: color.primary,
    height: 75,
    position: "absolute",
    right: 0,
    top: 0,
    width: 261,
  },
  statusContent: {
    color: color.background,
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: 18,
    position: "absolute",
  },
  statusOptionView: {
    alignItems: "center",
    backgroundColor: color.primary,
    borderRadius: 20,
    height: 22,
    justifyContent: "center",
    position: "absolute",
    right: 298,
    top: 38,
    width: 22,
  },
  statusView: {
    alignItems: "center",
    backgroundColor: color.primary,
    borderRadius: 20,
    height: 22,
    justifyContent: "center",
    left: 315,
    position: "absolute",
    top: 33,
    width: 22,
  },
  statusViewSend: {
    height: 11,
    left: 317,
    position: "absolute",
    top: 40,
    width: 19,
  },
  textGim: {
    color: color.text,
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    left: 4,
    lineHeight: 21,
    position: "absolute",
    textAlign: "center",
    top: 31,
  },
  textUnRead: {
    color: color.text,
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: 21,
    position: "absolute",
    textAlign: "center",
    top: 31,
  },
  unReadView: {
    height: 52,
    left: 21,
    position: "absolute",
    top: 14,
    width: 52,
  },
})

export const MessageScreen = observer(function MessageScreen() {
  const navigation = useNavigation()
  const { userStore, conversationStore, navigationStore } = useStores()
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const fetchConversation = async () => {
      await conversationStore.getConversations()
      setConversations([...conversationStore.conversations])
    }
    fetchConversation()
  }, [])

  function handleTouch(conversation) {
    navigationStore.setChatScreenParams({ conversationId: conversation._id })
    navigation.navigate(CHAT)
  }

  const MessageUser = observer(function MessageUser(props: any) {
    const { user } = props
    const [isShowing, setIsShowing] = useState(false)
    return (
      <TouchableOpacity
        activeOpacity={0.2}
        onLongPress={() => setIsShowing(!isShowing)}
        onPress={() => {
          handleTouch(user)
        }}
      >
        <View style={styles.messageUser}>
          <Text style={styles.messageUserTextName}>{user.displayName}</Text>
          {/* <Image source={{ uri: user.avatar }} style={styles.messageUserAvatar} /> */}
          <Image
            source={
              user.avatar
                ? { uri: user.avatar }
                : require("../../../assets/imgs/default-avatar.jpg")
            }
            style={styles.messageUserAvatar}
          />
          <Text style={styles.messageUserText}>
            {user.messages[user.messages.length - 1].content}
          </Text>
          <Text style={styles.messageUserLastTime}>
            {user.messages[user.messages.length - 1].createdAt.toLocaleTimeString("en-US")}
          </Text>
          {/* <StatusMessage status={user.status} /> */}
        </View>
        <TouchOption option={isShowing} user={user} />
      </TouchableOpacity>
    )
  })

  function TouchOption(prop) {
    const user = prop.user
    if (prop.option === false) {
      return <View></View>
    } else {
      return (
        <View style={styles.messageUser}>
          <Text style={styles.messageUserOptionLastTime}>{user.lastTime}</Text>
          <View style={styles.statusOptionView}>
            <Text style={styles.statusContent}>{user.status}</Text>
          </View>
          <View style={styles.optionView}>
            <View style={styles.unReadView}>
              <FontAwesomeIcon
                icon={faComment}
                color={color.background}
                style={styles.iconUnRead}
                size={scaledSize(25)}
              />
              <Text style={styles.textUnRead}>Unread</Text>
            </View>
            <View
              style={{
                position: "absolute",
                backgroundColor: color.background,
                height: 37,
                width: 1,
                top: 22,
                left: 95,
              }}
            />
            <View style={styles.gimView}>
              <FontAwesomeIcon icon={faThumbtack} color={"#FFFFFF"} size={scaledSize(25)} />
              <Text style={styles.textGim}>Pin</Text>
            </View>
            <View
              style={{
                position: "absolute",
                backgroundColor: color.background,
                height: 37,
                width: 1,
                top: 22,
                left: 178,
              }}
            />
            <View style={styles.moreView}>
              <FontAwesomeIcon
                icon={faEllipsisH}
                color={"#FFFFFF"}
                style={{ left: 3 }}
                size={scaledSize(25)}
              />
              <Text style={styles.moreText}>More</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  function StatusMessage(prop) {
    const status = prop.status
    if (status > SEEN) {
      return (
        <View style={styles.statusView}>
          <Text style={styles.statusContent}>{status}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.statusViewSend}>
          <FontAwesomeIcon
            icon={faCheck}
            color={"#1E98BE"}
            style={{ top: 0 }}
            size={scaledSize(11)}
          />
          <FontAwesomeIcon
            icon={faCheck}
            color={"#1E98BE"}
            style={{ bottom: 0, left: 8, top: -11 }}
            size={scaledSize(11)}
          />
        </View>
      )
    }
  }

  return (
    <Screen style={ROOT}>
      <View style={styles.messageHeader}>
        <Text style={styles.messageText}>Messages</Text>
        {/* <FontAwesomeIcon icon={faCamera} style={styles.messageImage} size={scaledSize(25)} /> */}
      </View>
      <View style={styles.messageContainer}>
        <FlatList
          data={conversations}
          renderItem={({ item }) => <MessageUser user={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Screen>
  )
})
