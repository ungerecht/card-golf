import React from 'react'

import { ChakraProvider, Container, Heading } from '@chakra-ui/react'

import EntryForm from './EntryForm'

const App = () => {
  return (
    <ChakraProvider>
      <div className='App'>
        <Container mt='20'>
          <Heading textAlign='center' mb='20'>
            Six Card Golf
          </Heading>
          <EntryForm />
        </Container>
      </div>
    </ChakraProvider>
  )
}

export default App
