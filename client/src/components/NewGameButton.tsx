import { ChangeEvent, useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
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

type gameButtonProps = {
  createGame: (numHoles: number) => void
}

const NewGameButton = ({ createGame }: gameButtonProps) => {
  const [numHoles, setNumHoles] = useState<number>(9)
  const [isPassword, setIsPassword] = useBoolean(false)
  const [showPassword, setShowPassword] = useBoolean(false)
  const [password, setPassword] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    createGame(numHoles)
  }

  return (
    <>
      <Button colorScheme='cyan' fontWeight='bold' onClick={onOpen}>
        CREATE NEW GAME
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='xs'>
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
            <Button colorScheme='red' fontWeight='bold' onClick={onClose}>
              CANCEL
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewGameButton
