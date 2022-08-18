import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { leaveRoom } from '../features/socket'
import PlayerCard, { PlayerProps } from './PlayerCard'
import {
  Container,
  SimpleGrid,
  Center,
  Heading,
  Button,
  Stack,
} from '@chakra-ui/react'

type lobbyProps = {
  password: string
}

const RoomLobby = () => {
  let navigate = useNavigate()
  const [players, setPlayers] = useState<PlayerProps[]>(new Array(6))

  useEffect(() => {
    const emptyPlayers = new Array(6)
    for (let i = 0; i < emptyPlayers.length; i++) {
      emptyPlayers[i] = { avatar: -1, name: '' }
    }
    setPlayers(emptyPlayers)
  }, [])

  const handleReady = () => {}
  const handleLeave = async () => {
    // ...leave the room...
    await leaveRoom()
    navigate('/')
  }

  return (
    <Container mt={20}>
      <Heading textAlign='center' my='10'>
        Waiting for players...
      </Heading>
      <Center>
        <SimpleGrid columns={[3, 3]} spacing={2} maxWidth='260px'>
          {players.map((player, index) => (
            <PlayerCard
              key={'player ' + index}
              avatar={player.avatar}
              name={player.name}
            />
          ))}
        </SimpleGrid>
      </Center>
      <Stack direction='row' justify='center' mt={10}>
        <Button
          size='lg'
          colorScheme='green'
          fontWeight='bold'
          onClick={handleReady}
        >
          Ready
        </Button>
        <Button
          size='lg'
          colorScheme='red'
          fontWeight='bold'
          onClick={handleLeave}
        >
          Leave
        </Button>
      </Stack>
    </Container>
  )
}

export default RoomLobby
