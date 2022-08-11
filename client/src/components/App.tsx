import React from 'react'

import { ChakraProvider, Container, Heading } from '@chakra-ui/react'

import { io, Socket } from 'socket.io-client'

import EntryForm from './EntryForm'

const App = () => {
  const socket = io('http://localhost:8080')

  const createGame = (numHoles: number) => {
    console.log('create game with ' + numHoles + ' holes')
    socket.emit('createRoom', (socket: Socket) => {
      console.log(socket)
    })
  }

  const joinGame = (roomCode: string) => {
    console.log('join game ' + roomCode)
  }

  return (
    <ChakraProvider>
      <div className='App'>
        <Container mt='20'>
          <Heading textAlign='center' mb='20'>
            Six Card Golf
          </Heading>
          <EntryForm createGame={createGame} joinGame={joinGame} />
        </Container>
      </div>
    </ChakraProvider>
  )
}

export default App
