import type { NextPage } from 'next'
import {
  Flex,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import SubmissionBox from '@components/SubmissionBox'
import Footer from '@components/Footer'

const ModifySubmissionPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { colorMode, toggleColorMode } = useColorMode()
  const headingColor = useColorModeValue(
    'linear(to-t, linkedin.700, linkedin.400)',
    'linear(to-t, linkedin.500, linkedin.300)')

  return (
    <>
      <title>Dreamschools - Modify a Listing</title>
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
          Modify a listing
        </Text>
        <SubmissionBox modifyId={id as string}/>
      </Flex>

      <Footer/>

      <Switch isChecked={colorMode === 'dark'} size="lg" pos="fixed" left="1rem"
              bottom="1rem"
              onChange={toggleColorMode}/>
    </>
  )
}

export default ModifySubmissionPage