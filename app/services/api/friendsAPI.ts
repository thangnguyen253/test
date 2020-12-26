import { Api } from "."

export const getFriendList = () => {
  return Api.get(`/users/friends`)
}

export const sendFriendRequest = (friendId: string) => {
  return {}
}

export const getFriendRequests = () => {
  return Api.get(`/users/friend-requests`)
}

export const addFriend = (friendId: string) => {
  return Api.post(`/users/friends`, friendId)
}

export const deleteFriend = (friendId: string) => {
  return Api.put(`/users/friends`, friendId)
}
