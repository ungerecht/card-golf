import { io } from 'socket.io-client'

const socket = io('http://localhost:8080')

export const createRoom = (playerName: string, numHoles: number) => {
  console.log(playerName + ' is creating room with ' + numHoles + ' holes')

  socket.emit('createRoom', playerName, numHoles)
}

export const joinRoom = (playerName: string, roomId: string) => {
  console.log('Joining room ' + roomId)
  socket.emit('joinRoom', playerName, roomId)
}

export const leaveRoom = () => {
  console.log('Leaving room')
}

//When room is created, join the room
socket.on('roomCreated', (playerName: string, roomId: string) => {
  joinRoom(playerName, roomId)
})
