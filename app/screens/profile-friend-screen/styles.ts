/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native"
import { color } from "../../theme/color"
import { scaledSize } from "../../theme/sizing"

export const styles = StyleSheet.create({
  avatar: {
    borderRadius: scaledSize(100),
    height: scaledSize(200),
    marginTop: 20,
    width: scaledSize(200),
  },
  backButton: {
    marginRight: 20,
  },
  containerView: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  fullName: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: color.primary,
    flexDirection: "row",
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%"
  },
  headerName: {
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft: 20,
  },
  profileItems: {
    // marginTop: 20,
  },
  scrollView: {
    width: "100%",
  },
  section: {
    color: "grey",
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
    marginTop: 10
  }
})
