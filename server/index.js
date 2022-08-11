const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors)

const http = require('http')
const server = http.createServer(app)

const { Server, Socket } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const uuid = require('uuid-random')

const PORT = 8080 || process.env.PORT

const rooms = {}

io.on('connection', (socket) => {
  socket.id = uuid()
  console.log('new connection ' + socket.id)

  socket.on('ready', () => {
    console.log(socket.id + ' is ready')

    const room = rooms[socket.roomId]
    console.log('room ', room)
  })

  socket.on('createRoom', (callback) => {
    console.log('creating room')
    const room = {
      id: uuid(),
      sockets: [],
    }
    rooms[room.id] = room

    //join room
    room.sockets.push(socket)
    socket.join(room.id)

    callback()
  })

  socket.on('joinRoom', (roomId, callback) => {
    const room = rooms[roomId]

    room.sockets.push(socket)
    socket.join(room.id)

    callback(socket)
  })

  socket.on('leaveRoom', () => {
    // leaveRoom(socket)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected ' + socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
