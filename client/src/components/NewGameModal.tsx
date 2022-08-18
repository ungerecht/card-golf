import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Stack,
  Divider,
  Text,
  Flex,
  Switch,
  useBoolean,
  InputGroup,
  Input,
  InputRightElement,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from '@chakra-ui/react'

import { createRoom } from '../features/socket'

type newRoomProps = {
  isOpen: boolean
  close: () => void
  name: string
  avatar: number
}

const NewGameModal = ({ isOpen, close, name, avatar }: newRoomProps) => {
  let navigate = useNavigate()

  const [numHoles, setNumHoles] = useState<number>(9)
  const [password, setPassword] = useState<string>('')

  const [isPassword, setIsPassword] = useBoolean(false)
  const [showPassword, setShowPassword] = useBoolean(false)

  const handleHolesChange = (valueAsString: string, valueAsNumber: number) => {
    setNumHoles(valueAsNumber)
  }

  const handleTogglePassword = () => {
    setIsPassword.toggle()
  }

  const handleShowHide = () => {
    setShowPassword.toggle()
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleCreateGame = () => {
    console.log('create game')
    createRoom(name, numHoles, isPassword ? password : '')
    // navigate('/lobby')
  }

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered size='xs'>
      <ModalOverlay />
      <ModalContent px={6}>
        <ModalHeader fontWeight='bold' textAlign='center'>
          CREATE NEW LOBBY
        </ModalHeader>
        <Divider />
        <ModalBody py={4}>
          <Stack>
            <Flex direction='row' alignItems='center' justify='space-between'>
              <Text fontWeight='bold'>Holes:</Text>
              <NumberInput
                step={3}
                defaultValue={9}
                min={6}
                max={18}
                allowMouseWheel
                focusInputOnChange={false}
                width='100px'
                value={numHoles}
                onChange={handleHolesChange}
              >
                <NumberInputField fontWeight='bold' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex direction='row' alignItems='center' justify='space-between'>
              <Text fontWeight='bold'>Enable Password:</Text>
              <Switch size='lg' onChange={handleTogglePassword} />
            </Flex>

            <InputGroup>
              <Input
                pr='4.5rem'
                minLength={2}
                maxLength={8}
                isDisabled={!isPassword}
                type={showPassword ? 'text' : 'password'}
                placeholder={isPassword ? 'enter password' : 'no password'}
                onChange={handlePasswordChange}
                value={password}
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  size='sm'
                  onClick={handleShowHide}
                  isDisabled={!isPassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
        </ModalBody>
        <ModalFooter justifyContent='space-between'>
          <Button
            colorScheme='green'
            fontWeight='bold'
            onClick={handleCreateGame}
          >
            CREATE
          </Button>
          <Button colorScheme='red' fontWeight='bold' onClick={close}>
            CANCEL
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NewGameModal
