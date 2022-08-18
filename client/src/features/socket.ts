import { io } from 'socket.io-client'
import { checkPasswordResponse, checkRoomResponse } from '../types'

const socket = io('http://localhost:8080')

export const createRoom = async (
  playerName: string,
  numHoles: number,
  password: string
) => {
  console.log(playerName + ' is creating room with ' + numHoles + ' holes')

  await socket.emit('createRoom', playerName, numHoles, password)
}

export const checkRoom = (roomId: string) => {
  return new Promise((resolve: (value: checkRoomResponse) => void) => {
    socket.emit('checkRoom', roomId, (response: checkRoomResponse) => {
      resolve(response)
    })
  })
}

export const checkPassword = async (roomId: string, password: string) => {
  return new Promise((resolve: (value: checkPasswordResponse) => void) => {
    socket.emit(
      'checkPassword',
      roomId,
      password,
      (response: checkPasswordResponse) => {
        resolve(response)
      }
    )
  })
}

export const joinRoom = async (playerName: string, roomId: string) => {
  console.log('Joining room ' + roomId)

  await socket.emit('joinRoom', playerName, roomId)
}

export const leaveRoom = async () => {
  console.log('Leaving room')

  await socket.emit('leaveRoom')
}

//When room is created, join the room
socket.on('roomCreated', (playerName: string, roomId: string) => {
  console.log('Room ' + roomId + ' created.')
  joinRoom(playerName, roomId)
})

socket.on('fullRoom', () => {
  console.log('That room is full')
})
