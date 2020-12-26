import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  StyleSheet,
  ViewStyle,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  TouchableNativeFeedbackBase,
} from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { color } from "../../theme"
import { scaledSize } from "../../theme/sizing"
import { background } from "@storybook/theming"
import { palette } from "../../theme/palette"
import BackgroundTimer from 'react-native-background-timer'
import RNCallKeep from "react-native-callkeep"
import { useStores } from "../../models"
BackgroundTimer.start()
const ROOT: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.background,
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 130,
    height: 174,
    left: -87,
    position: "absolute",
    top: -250,
    width: 174,
    // backgroundColor: url(pexels-photo-3047316.jpg);
  },
  backgroundAnswering: {
    position: "absolute",
    // width: 533,
    // height: 819,
    //    width: '100%',
    //     height: '100%',
    // left: -285,
    // top: -390,
    // left: '0%',
    // top: '0%',
    // right: 0,
    // bottom:0,
    // background: url(pexels-photo-3047316.jpg);
  },
  backgroundStyle: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  decline: {
    height: 65,
    left: -30,
    position: "absolute",
    top: 260,
    width: 65,
  },
  declineImg: {
    height: 65,
    width: 65,
  },
  mute: {
    height: 60,
    position: "absolute",
    right: -123,
    top: 120,
    width: 60,
  },
  muteImg: {
    height: 60,
    width: 60,
  },
  muteText: {
    color: palette.offWhite,
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    height: 60,
    lineHeight: 18,
    position: "absolute",
    right: -1,
    textAlign: "center",

    top: 70,

    width: 60,
  },
  speaker: {
    height: 60,
    left: -120,
    position: "absolute",
    top: 120,
    width: 60,
  },
  speakerImg: {
    height: 60,
    width: 60,
  },
  speakerText: {
    color: palette.offWhite,
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    height: 60,
    left: -137,
    lineHeight: 18,
    position: "absolute",
    textAlign: "center",

    top: 190,

    width: 100,
  },
  time: {
    color: palette.offWhite,
    fontFamily: "Roboto",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "normal",
    height: 23.92,
    left: -34,
    lineHeight: 22,
    position: "absolute",
    textAlign: "center",
    top: -30,

    width: 72.86,
  },
  userName: {
    color: palette.offWhite,
    fontFamily: "Roboto",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "500",
    height: 31,
    left: -87,
    lineHeight: 30,
    position: "absolute",
    textAlign: "center",

    top: -65,

    width: 176,
  },

  videoCall: {
    height: 60,
    position: "absolute",
    right: -33,
    top: 120,
    width: 60,
  },
  videoCallImg: {
    height: 60,
    width: 60,
  },
  videoCallText: {
    color: palette.offWhite,
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    height: 60,
    lineHeight: 18,
    position: "absolute",
    right: -54,
    textAlign: "center",

    top: 190,

    width: 100,
  },
})
RNCallKeep.setup({
  ios: {
    appName: 'CallKeepDemo',
  },
  android: {
     alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
  },
})
export const AnsweringScreen = observer(function AnsweringScreen() {
  const [isMuted, setMuted] = useState(false)
  const {userStore } = useStores()
  const muteImage = require("../../../assets/call_icons/mute.png")
  const unMuteImage = require("../../../assets/call_icons/unmute.png")
  function handleSpeaker () {
    console.log()
  }
  const handleDecline = (user_id) => {
    user_id = userStore._id
    RNCallKeep.endCall(user_id)
  }
  const setonMuted = (user_id, isMuted) => {
    user_id = userStore._id
    RNCallKeep.setMutedCall(user_id, isMuted);
  }
  function handleMute () {
    console.log()
    const imgSrc = isMuted ? muteImage : unMuteImage
    return (
      <View>
        <Image source = {imgSrc} style={styles.muteImg} />
        {isMuted ? <Text style={styles.muteText}>Tắt tiếng</Text> : <Text style={styles.muteText}>Bật tiếng</Text>}
      </View>
    )
  }
  function handleVideoCall () {
    console.log()
  }
  return (
    <Screen style={ROOT}>
      <View style={styles.backgroundStyle}>
        <Image
          source={require("../../../assets/call_icons/userImage-test1.png")}
          style={styles.backgroundAnswering}
          blurRadius={6}
        />

        <TouchableOpacity onPress={handleDecline} style={styles.decline}>
          <Image source={require("../../../assets/call_icons/decline.png")} style={styles.declineImg} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={handleMute} style={styles.mute}>
          <Image source={require("../../../assets/call_icons/mute.png")} style={styles.muteImg} /></TouchableOpacity>
        <Text style={styles.muteText}>Tắt tiếng</Text> */}
        <TouchableOpacity onPress={() => setonMuted(userStore._id,!isMuted)} style={styles.mute}>
          {handleMute()}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSpeaker} style={styles.speaker}>
          <Image source={require("../../../assets/call_icons/speaker.png")} style={styles.speakerImg} />
        </TouchableOpacity>
        <Text style={styles.speakerText}>Loa ngoài</Text>

        <TouchableOpacity onPress={handleVideoCall} style={styles.videoCall}>
          <Image
            source={require("../../../assets/call_icons/video-call.png")}
            style={styles.videoCallImg}
          /></TouchableOpacity>
        <Text style={styles.videoCallText}>Gọi Video</Text>

        <Image
          source={require("../../../assets/call_icons/userImage-test1.png")}
          style={styles.avatar}
        />

        <Text style={styles.userName}>Thảo Xinh vcl</Text>

        <Text style={styles.time}>69:59</Text>
      </View>
    </Screen>
  )
})
