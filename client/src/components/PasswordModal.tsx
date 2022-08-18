import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useDisclosure,
  useBoolean,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react'

import { checkPassword, joinRoom } from '../features/socket'

type PasswordModalProps = {
  isOpen: boolean
  name: string
  roomCode: string
}

const PasswordModal = ({ isOpen, name, roomCode }: PasswordModalProps) => {
  const navigate = useNavigate()
  const { onClose } = useDisclosure()
  const [showPassword, setShowPassword] = useBoolean(false)
  const [password, setPassword] = useState('')

  const handleShowHide = () => {
    setShowPassword.toggle()
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleEnterPassword = async () => {
    const response = await checkPassword(roomCode, password)
    console.log(response)
    if (response.correct) {
      joinRoom(name, roomCode)
      // navigate('/lobby')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='xs'>
      <ModalOverlay />
      <ModalContent px={6}>
        <ModalHeader fontWeight='bold' textAlign='center'>
          ENTER PASSWORD
        </ModalHeader>
        <ModalBody py={4}>
          <InputGroup>
            <Input
              pr='4.5rem'
              minLength={2}
              maxLength={8}
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
              value={password}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleShowHide}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalBody>
        <ModalFooter justifyContent='center'>
          <Button
            colorScheme='green'
            fontWeight='bold'
            onClick={handleEnterPassword}
          >
            Enter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PasswordModal
