import { Instance, types } from "mobx-state-tree"
import { withEnvironment } from "./extensions/with-environment"

export const defaults = {
  chatScreenParams: {
    conversationId: "",
  },
  profileFriendScreenParams: {
    user: null,
  },
}

const Info = types.model({
  _id: types.string,
  fullName: types.string,
  avatar: types.maybeNull(types.string),
  username: types.string,
})

const Friend = types.model({
  chatted: types.boolean,
  info: Info,
})

export const NavigationStoreModel = types
  .model()
  .props({
    chatScreenParams: types.model({
      conversationId: types.string,
    }),
    profileFriendScreenParams: types.model({
      user: types.maybeNull(Friend),
    }),
  })
  .extend(withEnvironment) // ** IMPORTANT! **
  .actions((self) => ({
    setChatScreenParams: function (params) {
      self.chatScreenParams = { ...self.chatScreenParams, ...params }
    },
    setProfileFriendScreenParams: function (params) {
      self.profileFriendScreenParams = { ...self.profileFriendScreenParams, ...params }
    },
  }))
export const createNavigationStoreModel = () =>
  types.optional(NavigationStoreModel, defaults as any)

export type NavigationStore = Instance<typeof NavigationStoreModel>
