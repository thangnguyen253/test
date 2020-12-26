/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native"
import { color } from "../../theme/color"

export const styles = StyleSheet.create({
  addFriendButton: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  addFriendIcon: {
    color: "#1A1A1A",
    fontSize: 30,
    marginTop: -2,
  },
  avatar: {
    borderRadius: 15,
    height: 60,
    width: 60,
  },
  avatarWrapper: {
    height: 60,
    width: 60,
  },
  body: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 7,
    overflow: "hidden",
    width: "100%",
  },
  bodyFriendWrapper: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 20,
    width: "100%",
  },
  bodyName: {
    color: color.text,
    fontSize: 15,
    fontWeight: "bold",
  },
  favoriteName: {
    color: "#FFF",
    fontSize: 15,
    marginTop: 5,
    textAlign: "center",
  },
  favoriteOnlineStatus: {
    borderColor: "#1A1A1A",
    borderRadius: 5,
    borderWidth: 1,
    bottom: -5,
    height: 10,
    left: 25,
    position: "absolute",
    width: 10,
  },
  favoriteText: {
    color: "#FFF",
    fontSize: 15,
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  header: {
    flex: 5,
    width: "100%",
  },
  headerTitle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 20,
  },
  infoTextGroup: {
    marginLeft: 10,
  },
  onlineStatusText: {
    color: "grey",
    fontSize: 12,
  },
  searchInput: {
    backgroundColor: "#323232",
    borderRadius: 30,
    color: "grey",
    paddingHorizontal: 20,
  },
  searchWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    color: "#FFF",
    fontSize: 25,
    // fontWeight: "bold",
  },
})
