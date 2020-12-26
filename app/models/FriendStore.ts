import { getFriendList } from "./../services/api/friendsAPI"
import { Instance, types, flow } from "mobx-state-tree"
import { withEnvironment } from "./extensions/with-environment"

export const defaults = {
  friends: [],
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

export const FriendStoreModel = types
  .model()
  .props({
    friends: types.array(Friend),
  })
  .extend(withEnvironment) // ** IMPORTANT! **
  .actions((self) => ({
    getFriendList: flow(function * () {
      const friends = (yield getFriendList()).data
      self.friends = friends
    }),
  }))

export const createFriendStoreModel = () => types.optional(FriendStoreModel, defaults as any)

export type FriendStore = Instance<typeof FriendStoreModel>
