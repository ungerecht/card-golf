import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import EntryForm from './EntryForm'
import RoomLobby from './RoomLobby'

const App = () => {
  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<EntryForm />} />
        <Route path='/lobby' element={<RoomLobby />} />
        {/* <Route path='/game' element={} /> */}
      </Routes>
    </ChakraProvider>
  )
}

export default App
