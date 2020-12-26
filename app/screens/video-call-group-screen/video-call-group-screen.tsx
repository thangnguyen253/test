import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { StyleSheet, ViewStyle, View, Image, FlatList, TouchableOpacity, ScrollView } from "react-native"
import { Screen } from "../../components"
import { scaledSize } from "../../theme/sizing"
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
  height: "100%"
}

const styles = StyleSheet.create({
  changeCamera: {
    height: 30,
    left: 30,
    position: "absolute",
    top: 30,
    width: 30,
  },
  changeCameraImg: {
    height: 30,
    width: 30,
  },
  containerView: {
    backgroundColor: color.text,
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "space-evenly",
    height: "100%",
    width: "100%",
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
  },
  videoView: {
    // flex: 1
    minHeight: 350,
    width: "50%",
  }
})

export const VideoCallGroupScreen = observer(function VideoCallGroupScreen() {
  const [mute, setMute] = useState(false)
  const [camera, setCamera] = useState(true)
  const [localStream, setLocalStream] = useState(null)
  const [remoteStreams, setRemoteStreams] = useState([])

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

  const Mute = () => {
    if (mute) {
      return (
        <Image
          source={require("../../../assets/call_icons/mute.png")}
          style={styles.muteImg}
        />
      )
    } else {
      return (
        <Image
          source={require("../../../assets/call_icons/unmute.png")}
          style={styles.muteImg}
        />
      )
    }
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

  const handleMute = () => {
    localStream._tracks[0].muted = !localStream._tracks[0].muted
    setMute(localStream._tracks[0].muted)
  }

  const handleVideoOff = () => {
    // debugger
    const videoTrack = localStream.getTracks().filter(track => track.kind === 'video')
    videoTrack[0].enabled = !videoTrack[0].enabled
    setCamera(videoTrack[0].enabled)
  }

  start()

  const VideoCallView = function(prop) {
    const stream = prop.stream

    return (
      <View style = {styles.videoView}>
        {
          stream &&
          <RTCView
            streamURL={stream.toURL()}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: "100%", height: "100%" }}
          />
        }
      </View>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <ScrollView>
        <View style = {styles.containerView}>
          <View style = {styles.videoView}>
            {
              localStream &&
              <RTCView
                streamURL={localStream.toURL()}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ flex: 1 }}
              />
            }
          </View>
          <View style = {styles.videoView}>
            {
              localStream &&
              <RTCView
                streamURL={localStream.toURL()}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ flex: 1 }}
              />
            }
          </View>
          <FlatList
            data={remoteStreams}
            renderItem={({ item }) => <VideoCallView stream={item} />}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => { localStream._tracks[0]._switchCamera() }}
        style={styles.changeCamera}
      >
        <Image
          source={require("../../../assets/call_icons/change-camera.png")}
          style={styles.changeCameraImg}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleVideoOff} style={styles.videoOff}>
        <VideoOff/>
      </TouchableOpacity>
      <TouchableOpacity onPress={stop} style={styles.decline}>
        <Image source={require("../../../assets/call_icons/decline.png")} style={styles.declineImg} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMute} style={styles.mute}>
        <Mute/>
      </TouchableOpacity>
    </Screen>
  )
})
