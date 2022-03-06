import type { NextPage } from 'next'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import useSWR from 'swr'
import fetcher from '@lib/fetcher'
import ListingCards from '@components/ListingCards'
import Footer from '@components/Footer'
import AddButton from '@components/AddButton'
import { useState } from 'react'

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const headingColor = useColorModeValue(
    'linear(to-t, linkedin.700, linkedin.400)',
    'linear(to-t, linkedin.500, linkedin.300)')

  const [search, setSearch] = useState('')

  const { data, error } = useSWR('/api/listings', fetcher)
  const state = data || error ? (error ? 'error' : 'data') : 'loading'

  return (
    <>
      <title>Dreamschools - School Listings</title>
      <Flex minHeight="90vh" flexDir="column">
        <Flex flexDir="column">
          <Text
            bgGradient={headingColor}
            bgClip="text"
            fontSize="5xl"
            fontWeight="extrabold"
            textAlign="center"
            mt="3rem"
            userSelect="none"
            mb="2rem">
            Find your school
          </Text>
          <Input mx="auto" w="75%" mb="2rem" value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search Listings"/>
        </Flex>
        <Flex justifyContent="center">
          {
            state === 'loading' ? <Spinner size="xl"/> :
              state === 'error' ?
                <Text fontSize="xl">An error has occurred. Please refresh the
                  page and try again.</Text> :
                <ListingCards {...data} search={search}/>
          }
        </Flex>
      </Flex>

      <Footer/>

      <AddButton size="lg" pos="fixed" right="1rem" bottom="1rem"
                 colorScheme="linkedin" aria-label="Add listing"/>
      <FormControl display="flex" alignItems="center" pos="fixed" left="1rem"
                   bottom="1rem">
        <FormLabel my="auto" htmlFor="toggleDark">Night mode</FormLabel>
        <Switch id="toggleDark" isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}/>
      </FormControl>

    </>
  )
}

export default Home