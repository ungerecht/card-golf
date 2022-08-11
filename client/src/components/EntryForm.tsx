import { ChangeEvent, useState } from 'react'
import {
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  Tab,
  Divider,
  Alert,
} from '@chakra-ui/react'

import { person, key } from '../icons'
import NewGameButton from './NewGameButton'

type formProps = {
  createGame: (numHoles: number) => void
  joinGame: (roomCode: string) => void
}

const EntryForm = ({ createGame, joinGame }: formProps) => {
  const [name, setName] = useState<string>('')
  const [avatar, setAvatar] = useState<number>(0)
  const [roomCode, setRoomCode] = useState<string>('')

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleAvatarChange = (index: number) => {
    setAvatar(index)
  }

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setRoomCode(value)
  }

  const handleJoinRandomGame = () => {
    console.log('join random game')
  }

  const handleJoinGame = () => {
    if (validateRoomCode()) joinGame(roomCode)
  }

  const validateName = () => {
    // if no name -> Alert
  }

  const validateRoomCode = () => {
    // if room code invalid -> Alert
    return true
  }

  return (
    <Stack direction='column' spacing={3}>
      <FormControl>
        <FormLabel fontWeight='bold' color='gray'>
          Player Name
        </FormLabel>
        <InputGroup>
          <InputLeftElement children={person} />
          <Input
            onChange={handleNameChange}
            value={name}
            minLength={1}
            maxLength={6}
          />
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel fontWeight='bold' color='gray'>
          Choose your Avatar
        </FormLabel>
        <Tabs
          variant='soft-rounded'
          isFitted
          size='lg'
          onChange={handleAvatarChange}
        >
          <TabList>
            <Tab>0</Tab>
            <Tab>1</Tab>
            <Tab>2</Tab>
            <Tab>3</Tab>
            <Tab>4</Tab>
            <Tab>5</Tab>
            <Tab>6</Tab>
            <Tab>7</Tab>
          </TabList>
        </Tabs>
      </FormControl>

      <NewGameButton createGame={createGame} />

      <Button
        colorScheme='cyan'
        fontWeight='bold'
        isDisabled
        onClick={handleJoinRandomGame}
      >
        JOIN RANDOM GAME
      </Button>

      <Divider height={3} />

      <FormControl>
        <FormLabel fontWeight='bold' color='gray'>
          Room Code
        </FormLabel>
        <InputGroup>
          <InputLeftElement children={key} />
          <Input onChange={handleCodeChange} value={roomCode} />
        </InputGroup>
      </FormControl>
      <Button colorScheme='yellow' fontWeight='bold' onClick={handleJoinGame}>
        JOIN USING CODE
      </Button>
    </Stack>
  )
}

export default EntryForm
