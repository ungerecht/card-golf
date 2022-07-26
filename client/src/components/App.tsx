import React from 'react'

import { ChakraProvider, Container, Heading } from '@chakra-ui/react'

import { io } from 'socket.io-client'

import EntryForm from './EntryForm'

const App = () => {
  //   const socket = io('http://localhost:8080')
  return (
    <ChakraProvider>
      <div className='App'>
        <Container>
          <Heading textAlign='center'>Six Card Golf</Heading>
          <EntryForm />
        </Container>
      </div>
    </ChakraProvider>
  )
}

export default App
