const { nanoid } = require('nanoid') //uuid generator for rooms

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors)

const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const PORT = 8080 || process.env.PORT

const rooms = {}

io.on('connection', (socket) => {
  console.log('new connection ' + socket.id)

  socket.on('createRoom', (playerName, numHoles, password) => {
    console.log(playerName + ' is creating room with ' + numHoles)

    //make new room
    const room = {
      id: nanoid(8),
      sockets: [],
      numHoles: numHoles,
      password: password,
    }
    rooms[room.id] = room

    //tell the client a room was created
    socket.emit('roomCreated', playerName, room.id, password)
  })

  socket.on('checkRoom', async (roomId, callback) => {
    const isRoom = rooms[roomId] !== undefined
    const hasPassword = isRoom ? rooms[roomId].password.length > 0 : false
    callback({ isRoom, hasPassword })
  })

  socket.on('checkPassword', async (roomId, password, callback) => {
    const correct = rooms[roomId].password === password
    callback({ correct })
  })

  socket.on('joinRoom', (playerName, roomId) => {
    console.log(playerName + ' joining room ' + roomId)

    if (rooms[roomId].sockets.length < 6) {
      //max of 6 players per room
      //join room
      socket.playerName = playerName
      rooms[roomId].sockets.push(socket)
      socket.join(roomId)
    } else {
      socket.emit('fullRoom')
    }
  })

  socket.on('leaveRoom', (playerName, roomId) => {
    console.log(playerName + ' leaving room ' + roomId)

    rooms[roomId].sockets = rooms[roomId].sockets.filter(
      (item) => item != socket
    )
    socket.leave(roomId)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
