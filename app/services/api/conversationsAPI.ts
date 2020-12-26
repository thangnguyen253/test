import { Api } from "."

export const getAllConversations = () => {
  return Api.get(`/conversations`)
}

export const createConversation = (friendId: string, message: any) => {
  return Api.post(`/conversations`, { friendId, message })
}
