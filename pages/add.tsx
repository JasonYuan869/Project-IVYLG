import type { NextPage } from 'next'
import {
  Flex,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Footer from '@components/Footer'
import SubmissionBox from '@components/SubmissionBox'

const Add: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const headingColor = useColorModeValue(
    'linear(to-t, linkedin.700, linkedin.400)',
    'linear(to-t, linkedin.500, linkedin.300)')

  return (
    <>
      <title>Dreamschools - Create a Listing</title>
      <Flex minHeight="90vh" flexDir="column" alignItems="center">
        <Text
          bgGradient={headingColor}
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
          textAlign="center"
          mt="3rem"
          userSelect="none"
          mb="2rem">
          Create a listing
        </Text>
        <SubmissionBox/>
      </Flex>

      <Footer/>

      <Switch isChecked={colorMode === 'dark'} size="lg" pos="fixed" left="1rem"
              bottom="1rem"
              onChange={toggleColorMode}/>
    </>
  )
}

export default Add