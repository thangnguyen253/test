import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, ViewStyle, View, Image, FlatList, TouchableOpacity } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { color } from "../../theme"
import { scaledSize } from "../../theme/sizing"
import { palette } from "../../theme/palette"
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc'

const ROOT: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.text,
  width: "100%",
  // height: "100%"
}

const styles = StyleSheet.create({
  backgroundStyle: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%"
  },
  backgroundVideo: {
    height: "100%",
    width: "121%",
  },
  callerVideoContainer: {
    borderRadius: 5,
    height: 150,
    position: "absolute",
    right: "5%",
    top: "5%",
    width: 90
  },
  changeCamera: {
    height: 30,
    left: "10%",
    position: "absolute",
    top: "5%",
    width: 30,
  },
  changeCameraImg: {
    height: 30,
    width: 30,
  },
  decline: {
    bottom: "10%",
    height: 65,
    position: "absolute",
    width: 65
  },
  declineImg: {
    height: 65,
    width: 65,
  },
  mute: {
    bottom: "10%",
    height: 55,
    left: "20%",
    position: "absolute",
    width: 55
  },
  muteImg: {
    height: 55,
    width: 55,
  },
  time: {
    alignItems: "center",
    color: palette.offWhite,
    fontFamily: "Roboto",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "normal",
    height: 22,
    justifyContent: "center",
    lineHeight: 22,
    position: "absolute",
    textAlign: "center",
    top: -280,
    width: 46,
  },
  userName: {
    alignItems: "center",
    color: palette.offWhite,
    fontFamily: "Roboto",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "500",
    height: 30,
    justifyContent: "center",
    lineHeight: 30,
    position: "absolute",
    textAlign: "center",
    top: -315,
    width: "100%",
  },
  videoOff: {
    bottom: "10%",
    height: 55,
    position: "absolute",
    right: "20%",
    width: 55
  },
  videoOffImg: {
    height: 55,
    width: 55,
  }
})

export const VideoCallScreen = observer(function VideoCallScreen() {
  // Test
  const [localStream, setLocalStream] = useState(null)
  const [removeStream, setRemoveStream] = useState(null)
  const [mic, setMic] = useState(true)
  const [camera, setCamera] = useState(true)
  const [isMuted, setMuted] = useState(false)
  const muteImage = require("../../../assets/call_icons/mute.png")
  const unMuteImage = require("../../../assets/call_icons/unmute.png")
  if (localStream !== null) {
    console.log(localStream._tracks[0])
  }

  const start = async () => {
    console.log('start')
    if (!localStream) {
      let s
      try {
        s = await mediaDevices.getUserMedia({ video: true })
        setLocalStream(s)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const stop = () => {
    console.log('stop')
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
      localStream.release()
      setLocalStream(null)
    }
  }

  const handleMute = () => {
    localStream._tracks[0].muted = !localStream._tracks[0].muted
    setMic(!localStream._tracks[0].muted)
  }

  const VideoOff = () => {
    if (camera) {
      return (
        <Image
          source={require("../../../assets/call_icons/video-call.png")}
          style={styles.videoOffImg}
        />
      )
    } else {
      return (
        <Image
          source={require("../../../assets/call_icons/video-off.png")}
          style={styles.videoOffImg}
        />
      )
    }
  }

  const muteChange = () => {
    const imgSrc = isMuted ? muteImage : unMuteImage
    return (
      <View>
        <Image source = {imgSrc} style={styles.muteImg} />
      </View>
    )
  }
  const handleDecline = () => {
    stop()
  }
  const handleVideoOff = () => {
    // debugger
    const videoTrack = localStream.getTracks().filter(track => track.kind === 'video')
    videoTrack[0].enabled = !videoTrack[0].enabled
    setCamera(videoTrack[0].enabled)
  }

  start()

  return (
    <Screen style={ROOT}>
      <View style={styles.backgroundStyle}>
        {/* <Image
          source={require("../../../assets/call_icons/userImage-test2.png")}
          style={styles.backgroundVideo}
        /> */}
        <View style={styles.backgroundVideo}>
          {
            removeStream &&
            <RTCView
              streamURL={removeStream.toURL()}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ flex: 1 }} />
          }
        </View>
        <TouchableOpacity onPress={handleMute} style={styles.mute}></TouchableOpacity>
        <TouchableOpacity onPress={() => setMuted(!isMuted)} style={styles.mute}>
          {muteChange()}
        </TouchableOpacity>

        <TouchableOpacity onPress={stop} style={styles.decline}>
          <Image source={require("../../../assets/call_icons/decline.png")} style={styles.declineImg} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleVideoOff} style={styles.videoOff}>
          <VideoOff/>
        </TouchableOpacity>

        <View style={styles.callerVideoContainer}>
          {/* <Image
            source={require("../../../assets/call_icons/userImage-test3.png")}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: "100%", height: "100%", borderRadius: 5 }}
          /> */}
          {
            localStream &&
          <RTCView
            streamURL={localStream.toURL()}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ flex: 1 }} />
          }
        </View>

        <Text style={styles.userName}>Thảo xinh</Text>

        <Text style={styles.time}>69:59</Text>

        <TouchableOpacity
          onPress={() => { localStream._tracks[0]._switchCamera() }}
          style={styles.changeCamera}
        >
          <Image
            source={require("../../../assets/call_icons/change-camera.png")}
            style={styles.changeCameraImg}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
