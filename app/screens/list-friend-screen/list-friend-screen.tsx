/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image, FlatList, TouchableOpacity } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { ADD_FRIEND, PROFILE_FRIEND } from "../../constants"
import { useStores } from "../../models"
import { styles } from "./styles"
import { TextInput } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  backgroundColor: "#1A1A1A",
  flex: 1,
  alignItems: "center",
}

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

const dummyFriendList = [
  {
    id: "1",
    fullName: "Friend 1",
    avatar: null,
    online: true,
  },
  {
    id: "2",
    fullName: "Friend 2",
    avatar: null,
    online: false,
  },
  {
    id: "3",
    fullName: "Friend 3",
    avatar: null,
    online: true,
  },
  {
    id: "4",
    fullName: "Friend 4",
    avatar: null,
    online: true,
  },
  {
    id: "5",
    fullName: "Friend 5",
    avatar: null,
    online: false,
  },
  {
    id: "6",
    fullName: "Friend 6",
    avatar: null,
    online: true,
  },
]

export const ListFriendScreen = observer(function ListFriendScreen() {
  const { friendStore, navigationStore } = useStores()

  const [friendList, setFriendList] = useState([])
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => setRefreshing(false))
  }, [])
  useEffect(() => {
    const fetchFriends = async () => {
      await friendStore.getFriendList()
      setFriendList([...friendStore.friends])
    }
    fetchFriends()
  }, [])

  const handleAddFriend = () => {
    navigation.navigate(ADD_FRIEND)
  }

  const handleViewProfile = (user: any) => {
    const userObj = { ...user }
    navigationStore.setProfileFriendScreenParams({
      user: {
        chatted: userObj.chatted,
        info: {
          _id: userObj.info._id,
          fullName: userObj.info.fullName,
          username: userObj.info.username,
          avatar: userObj.info.avatar,
        },
      },
    })
    navigation.navigate(PROFILE_FRIEND)
  }

  return (
    <Screen style={ROOT}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Contacts</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleAddFriend()}>
            <View style={styles.addFriendButton}>
              <Text style={styles.addFriendIcon}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={"grey"}
            caretHidden
          />
        </View>
        <Text style={styles.favoriteText}>Favorites</Text>
        <FlatList
          style={{ width: "100%", paddingHorizontal: 20 }}
          horizontal
          data={dummyFriendList}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 25 }} />}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onPress={() => {
                  handleViewProfile(item)
                }}
              >
                <View style={{ alignItems: "center", width: 60, overflow: "hidden" }}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={
                        item.avatar
                          ? { uri: item.avatar }
                          : require("./../../../assets/imgs/default-avatar.jpg")
                      }
                      style={styles.avatar}
                    />
                    <View
                      style={[
                        styles.favoriteOnlineStatus,
                        { backgroundColor: item.online ? "#1AD42D" : "red" },
                      ]}
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.favoriteName}>
                    {item.fullName}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
      <View style={styles.body}>
        <FlatList
          style={{ width: "100%", paddingHorizontal: 30 }}
          data={friendList}
          keyExtractor={(item) => item.info._id}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onPress={() => {
                  handleViewProfile(item)
                }}
              >
                <View style={styles.bodyFriendWrapper}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={
                        item.avatar
                          ? { uri: item.info.avatar }
                          : require("./../../../assets/imgs/default-avatar.jpg")
                      }
                      style={styles.avatar}
                    />
                  </View>
                  <View style={styles.infoTextGroup}>
                    <Text numberOfLines={1} style={styles.bodyName}>
                      {item.info.fullName}
                    </Text>
                    <Text style={styles.onlineStatusText}>
                      {item.online ? "Online" : "Last activity 35min"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
    </Screen>
  )
})
