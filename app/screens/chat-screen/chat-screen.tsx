import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  StyleSheet,
  ViewStyle,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faCamera,
  faImage,
  faPaperPlane,
  faPhoneAlt,
  faVideo,
} from "@fortawesome/free-solid-svg-icons"
import { scaledSize } from "../../theme/sizing"
import ImagePicker from "react-native-image-crop-picker"
import { sendMessage } from "../../services/socket/socket"
import { cloudinaryUpload } from "../../services/api/cloudinaryAPI"

const ROOT: ViewStyle = {
  flexDirection: "column",
  height: "100%",
  width: "100%",
}

const styles = StyleSheet.create({
  call: {
    height: 25,
    position: "absolute",
    right: 100,
    width: 25,
  },

  cameraInput: {
    color: color.primary,
    marginLeft: 20,
    marginRight: 10,
  },

  containerView: {
    height: "83%",
    // marginBottom: 10,
  },

  friendAvatar: {
    borderRadius: 25,
    height: 30,
    margin: 10,
    width: 30,
  },

  friendContainer: {
    flexDirection: "row",
  },

  friendContentImage: {
    maxHeight: 500,
    width: 250,
  },

  friendContentText: {
    backgroundColor: color.backgroundSearch,
    borderRadius: 20,
    fontSize: 18,
    maxWidth: 280,
    padding: 8,
    paddingBottom: 5,
  },

  headerView: {
    borderBottomWidth: 2,
    borderColor: color.backgroundSearch,
    height: "10%",
    justifyContent: "center",
    width: "100%",
  },

  iContainer: {
    flexDirection: "row-reverse",
  },

  iContentImage: {
    marginRight: 10,
    maxHeight: 500,
    width: 280,
  },

  iContentText: {
    backgroundColor: color.primary,
    borderRadius: 20,
    color: color.line,
    fontSize: 18,
    marginRight: 10,
    maxWidth: 280,
    padding: 8,
  },

  image: {
    borderRadius: 15,
    height: "100%",
    width: "100%",
  },

  imageInput: {
    color: color.primary,
    marginLeft: 10,
    marginRight: 10,
  },

  input: {
    fontSize: 18,
  },

  inputContainerView: {
    borderColor: color.backgroundSearch,
    borderTopWidth: 2,
    bottom: 0,
    flexDirection: "row",
    height: "7%",
    justifyContent: "center",
    paddingTop: 5,
    position: "absolute",
    width: "100%",
  },

  inputContent: {
    bottom: 0,
    height: 40,
    justifyContent: "center",
    width: "92%",
  },

  inputView: {
    alignItems: "center",
    backgroundColor: color.backgroundSearch,
    borderRadius: 25,
    height: 30,
    justifyContent: "center",
    width: "58%",
  },

  messContainer: {
    width: "100%",
  },

  sendInput: {
    color: color.primary,
    marginLeft: 10,
    marginRight: 20,
  },

  time: {
    fontSize: 10,
  },

  timeContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  video: {
    height: 25,
    position: "absolute",
    right: 40,
    width: 25,
  },
})

export const ChatScreen = observer(function ChatScreen() {
  const { userStore, navigationStore, conversationStore } = useStores()

  const [messageText, setMessageText] = useState("")

  const [conversation, setConversation] = useState({
    _id: "0",
    displayName: "",
    avatar: "",
    members: [],
    messages: [],
  })

  useEffect(() => {
    const conversationInStore = conversationStore.conversations.find(
      (conversation) => conversation._id === navigationStore.chatScreenParams.conversationId,
    )
    setConversation({ ...conversationInStore })
  }, [])

  // useEffect(() => {
  //   subscribeToChat((err, data) => {
  //     if (err) return
  //     console.log(data)
  //   })
  // }, [conversation._id])

  function handleCall() {
    console.log()
  }

  function handleVideoCall() {
    console.log()
  }

  function handleSendMessage() {
    if (messageText.length > 0) {
      // const a = conversation.messages.slice()
      // a.push({ id: userStore._id, type: "text", content: messageText, createdAt: date })
      // setChat(a)
      sendMessage(conversation._id, {
        sender: userStore._id,
        type: "text",
        content: messageText,
      })
      setMessageText("")
    }
  }

  function sendMessageImage(messageImage) {
    // const a = conversation.messages.slice()
    // a.push({ id: userStore._id, type: "image", content: messageImage, createdAt: date })
    // setChat(a)
    sendMessage(conversation._id, {
      sender: userStore._id,
      type: "image",
      content: messageImage,
    })
  }

  function handleCamera() {
    ImagePicker.openCamera({
      height: 1928,
      width: 1080,
      cropping: false,
    }).then((image) => {
      sendMessageImage(image.path)
    })
  }

  async function handleImage() {
    try {
      const image = await ImagePicker.openPicker({
        height: 1928,
        width: 1080,
        includeBase64: true,
        mediaType: "photo",
      })

      const file = `data:${image.mime};base64,${image.data}`
      const uploadedImageUrl = await cloudinaryUpload(file)
      sendMessageImage(uploadedImageUrl)
    } catch (err) {
      console.log(err)
    }
  }

  function Content(prop) {
    const mess = prop.mess
    if (mess._id === userStore._id) {
      if (mess.type === "text") {
        return <Text style={styles.iContentText}>{mess.content}</Text>
      } else if (mess.type === "image") {
        return (
          <View style={styles.iContentImage}>
            <Image source={{ uri: mess.content }} style={styles.image} />
          </View>
        )
      }
    } else {
      if (mess.type === "text") {
        return <Text style={styles.friendContentText}>{mess.content}</Text>
      } else if (mess.type === "image") {
        return (
          <View style={styles.friendContentImage}>
            <Image source={{ uri: mess.content }} style={styles.image} />
          </View>
        )
      }
    }
  }

  function Message(prop) {
    const mess = prop.mess
    if (mess.sender === userStore._id) {
      return (
        <View style={styles.messContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{`${mess.createdAt.toLocaleTimeString(
              "it-IT",
            )} ${mess.createdAt.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}</Text>
          </View>
          <View style={styles.iContainer}>
            <Content mess={mess} />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.messContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{`${mess.createdAt.toLocaleTimeString(
              "it-IT",
            )} ${mess.createdAt.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}</Text>
          </View>
          <View style={styles.friendContainer}>
            <View>
              <Image
                style={styles.friendAvatar}
                source={
                  mess.avatar
                    ? { uri: mess.avatar }
                    : require("../../../assets/imgs/default-avatar.jpg")
                }
              />
            </View>
            <View style={styles.friendContainer}>
              <Content mess={mess} />
            </View>
          </View>
        </View>
      )
    }
  }

  return (
    conversation && (
      <Screen style={ROOT}>
        <View style={styles.headerView}>
          <TouchableOpacity style={styles.call} onPress={handleCall}>
            <FontAwesomeIcon icon={faPhoneAlt} color={color.primary} size={scaledSize(25)} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.video} onPress={handleVideoCall}>
            <FontAwesomeIcon icon={faVideo} color={color.primary} size={scaledSize(25)} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior={"padding"}>
          <View style={styles.containerView}>
            <View>
              <FlatList
                data={conversation.messages}
                renderItem={({ item }) => <Message mess={item} />}
                keyExtractor={(message) => message._id}
              />
            </View>
          </View>
          <View style={styles.inputContainerView}>
            <View>
              <TouchableOpacity onPress={handleCamera}>
                <FontAwesomeIcon icon={faCamera} style={styles.cameraInput} size={scaledSize(25)} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={handleImage}>
                <FontAwesomeIcon icon={faImage} style={styles.imageInput} size={scaledSize(25)} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <View style={styles.inputContent}>
                <TextInput style={styles.input} value={messageText} onChangeText={setMessageText} />
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={handleSendMessage}>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  style={styles.sendInput}
                  size={scaledSize(25)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    )
  )
})
