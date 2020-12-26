import { Instance, types, flow } from "mobx-state-tree"
import { withEnvironment } from "./extensions/with-environment"
import { getAllConversations } from "../services/api/conversationsAPI"

export const defaults = {
  conversations: [],
}

export const Message = types.model({
  _id: types.string,
  type: types.string,
  sender: types.string,
  content: types.string,
  createdAt: types.Date,
})

export const User = types.model({
  _id: types.string,
  fullName: types.string,
  username: types.string,
  avatar: types.maybeNull(types.string),
})

export const Conversation = types.model({
  _id: types.string,
  displayName: types.string,
  avatar: types.maybeNull(types.string),
  members: types.array(User),
  messages: types.array(Message),
})

export const ConversationStoreModel = types
  .model()
  .props({
    conversations: types.array(Conversation),
  })
  .extend(withEnvironment) // ** IMPORTANT! **
  .actions((self) => ({
    getConversations: flow(function * () {
      const conversations = (yield getAllConversations()).data
      self.conversations = conversations
    }),
    createConversation: flow(function * () {
      return null
    }),
    addMessageToConversation: function (conversationId, message) {
      const conversationIdx = self.conversations.findIndex(
        (conversation) => conversation._id === conversationId,
      )
      self.conversations[conversationIdx].messages.push(message)
    },
  }))

export const createConversationStoreModel = () =>
  types.optional(ConversationStoreModel, defaults as any)

export type ConversationStore = Instance<typeof ConversationStoreModel>
