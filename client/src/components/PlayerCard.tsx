import { VStack, Avatar, AvatarBadge, Text, Spinner } from '@chakra-ui/react'

export type PlayerProps = {
  avatar: number
  name: string
}

const PlayerCard = ({ avatar, name }: PlayerProps) => {
  return (
    <VStack border='1px solid black' borderRadius={10} py={1} width='80px'>
      <Avatar>
        <AvatarBadge />
      </Avatar>
      {name.length > 0 ? (
        <Text fontSize='md' fontWeight='bold'>
          name
        </Text>
      ) : (
        <Spinner size='sm' />
      )}
    </VStack>
  )
}

export default PlayerCard
