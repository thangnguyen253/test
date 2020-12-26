// import { API_URL } from "react-native-dotenv"
import io from "socket.io-client"

let socket

export const initiateSocket = (room) => {
  socket = io("http://localhost:5000/")
  console.log(`Connecting socket...`)
  if (socket && room) socket.emit("join", room)
}

export const disconnectSocket = () => {
  console.log("Disconnecting socket...")
  if (socket) socket.disconnect()
}

export const subscribeToChat = (cb) => {
  if (!socket) return true
  socket.on("chat", (msg) => {
    return cb(null, msg)
  })
}

export const sendMessage = (room, message) => {
  if (socket) socket.emit("chat", { message, room })
}
