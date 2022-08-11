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

const uuid = require('uuid-random')

const PORT = 8080 || process.env.PORT

const rooms = {}

io.on('connection', (socket) => {
  socket.id = uuid()
  console.log('new connection')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
