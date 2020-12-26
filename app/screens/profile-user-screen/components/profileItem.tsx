/* eslint-disable react-native/no-color-literals */
import React from "react"
import { Dimensions, StyleSheet, View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { color } from "../../../theme"

interface Props {
  icon: any
  title: string
  onClick: () => void
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 20,
    width: width,
  },
  icon: {
    alignItems: "center",
    borderRadius: 35,
    height: 35,
    justifyContent: "center",
    overflow: "hidden",
    width: 35,
  },
  title: {
    color: color.text,
    fontSize: 18,
    marginLeft: 10,
  },
})

export const ProfileItem: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <TouchableOpacity onPress={props.onClick} activeOpacity={0.7}>
        <View style={styles.container}>
          {/* <View style={{backgroundColor: 'red', borderRadius: 40, width: 40, height: 40, overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}}> */}
            <View style={{backgroundColor: 'white'}}>{props.icon}</View>
          {/* </View> */}
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </>
  )
}
