import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Heading,
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
  useBoolean,
} from '@chakra-ui/react'

import { person, key } from '../icons'
import NewGameModal from './NewGameModal'
import PasswordModal from './PasswordModal'
import { checkRoom, joinRoom } from '../features/socket'

const EntryForm = () => {
  let navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [avatar, setAvatar] = useState<number>(0)
  const [roomCode, setRoomCode] = useState<string>('')

  const [newGameModalOpen, setNewGameModalOpen] = useBoolean(false)
  const [passWordModalOpen, setPasswordModalOpen] = useBoolean(false)

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

  const handleShowCreateGame = () => {
    setNewGameModalOpen.on()
  }

  const handleCloseCreateGame = () => {
    setNewGameModalOpen.off()
  }

  const handleJoinGame = async () => {
    console.log('join game')
    const response = await checkRoom(roomCode)
    if (response.isRoom) {
      if (!response.hasPassword) {
        joinRoom(name, roomCode)
        // navigate('/lobby')
      } else {
        //room has password
        setPasswordModalOpen.on()
      }
    } else {
      console.log('invalid room code')
    }
  }

  return (
    <Container mt='20'>
      <Heading textAlign='center' mb='20'>
        Six Card Golf
      </Heading>
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

        <Button
          colorScheme='cyan'
          fontWeight='bold'
          onClick={handleShowCreateGame}
        >
          CREATE NEW GAME
        </Button>

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
            <Input
              onChange={handleCodeChange}
              value={roomCode}
              minLength={8}
              maxLength={8}
            />
          </InputGroup>
        </FormControl>
        <Button colorScheme='yellow' fontWeight='bold' onClick={handleJoinGame}>
          JOIN USING CODE
        </Button>

        <PasswordModal
          isOpen={passWordModalOpen}
          name={name}
          roomCode={roomCode}
        />

        <NewGameModal
          isOpen={newGameModalOpen}
          close={handleCloseCreateGame}
          name={name}
          avatar={avatar}
        />
      </Stack>
    </Container>
  )
}

export default EntryForm
