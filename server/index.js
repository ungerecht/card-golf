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

  socket.on('createRoom', (playerName, numHoles) => {
    console.log(playerName + ' is creating room with ' + numHoles)

    //make new room
    const room = {
      id: nanoid(8),
      sockets: [],
      numHoles: numHoles,
    }
    rooms[room.id] = room

    //tell the client a room was created
    socket.emit('roomCreated', playerName, room.id)
  })

  socket.on('joinRoom', (playerName, roomId) => {
    console.log(playerName + ' joining room ' + roomId)

    //join room
    socket.playerName = playerName
    rooms[roomId].sockets.push(socket)
    socket.join(roomId)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
