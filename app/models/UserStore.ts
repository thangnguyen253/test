/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { firebase } from "@react-native-firebase/messaging"
import { Instance, types, flow, applySnapshot } from "mobx-state-tree"
import { login, register } from "../services/api/authAPI"
import { getOneUserByUsername } from "../services/api/usersAPI"
import { withEnvironment } from "./extensions/with-environment"
// import jwt_decode from "jwt-decode"

export const defaults = {
  _id: "",
  avatar: "",
  username: "",
  fullName: "",
  email: "",
  accessToken: "",
  refreshToken: "",
  fcmToken: "",
}

export const UserStoreModel = types
  .model()
  .props({
    _id: types.string,
    username: types.string,
    fullName: types.string,
    avatar: types.maybeNull(types.string),
    email: types.string,
    accessToken: types.string,
    refreshToken: types.string,
    fcmToken: types.string,
  })
  .extend(withEnvironment) // ** IMPORTANT! **
  .actions((self) => ({
    login: flow(function * (account) {
      const { accessToken, refreshToken } = (yield login(account)).data
      const user = (yield getOneUserByUsername(account.username)).data
      const fcmToken = yield firebase.messaging().getToken()
      self._id = user._id
      self.username = user.username
      self.avatar = user.avatar
      self.fullName = user.fullName
      self.email = user.email
      self.accessToken = accessToken
      self.refreshToken = refreshToken
      self.fcmToken = fcmToken
    }),
    register: flow(function * (account) {
      yield register(account)
    }),
    signOut: function () {
      applySnapshot(self, defaults)
    },
  }))

export const createUserStoreModel = () => types.optional(UserStoreModel, defaults as any)

export type UserStore = Instance<typeof UserStoreModel>
