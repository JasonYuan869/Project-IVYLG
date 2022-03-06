import { ListingData } from '@models/Listing'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/hooks'
import DeleteModal from '@components/DeleteModal'
import { useRouter } from 'next/router'

const Card = ({ data }: { data: ListingData }) => {
  const router = useRouter()
  const deleteColor = useColorModeValue('red', 'red.400')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const modifyEntry = () => {
    router.push(`/modify/${data._id}`)
  }

  return (
    <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex flexDir={{ base: 'column', md: 'row' }}>
        <Image loading="lazy" borderRadius="lg" fit="cover"
               w={{ base: '100%', md: '40%' }}
               src={data.image}
               alt="logo"/>
        <Box w="100%">
          <Menu>
            <MenuButton float="right" right="1rem" top="1rem" as={IconButton}
                        variant="ghost" icon={<HamburgerIcon/>}
                        aria-label="Options"/>
            <MenuList>
              <MenuItem fontWeight="semibold"
                        onClick={modifyEntry}>Modify</MenuItem>
              <MenuItem fontWeight="semibold" onClick={onOpen}
                        textColor={deleteColor}>Delete</MenuItem>
            </MenuList>
          </Menu>
          <Heading mx="1rem" mt="1rem" isTruncated fontSize="xl"
                   fontWeight="bold">{data.name}</Heading>
          <Text m="1rem">{data.about}</Text>
        </Box>
      </Flex>
      <DeleteModal name={data.name} id={data._id} isOpen={isOpen}
                   onClose={onClose}/>
    </Box>
  )
}

export default Card