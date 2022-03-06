import { Flex, FlexProps, IconButton, Link, Text } from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai'

const Footer = (props: FlexProps) => {
  return (
    <Flex {...props} mt="2rem" mb="1rem" justifyContent="center">
      <IconButton as={Link} variant="ghost" icon={<AiFillGithub size="1.5rem"/>}
                  mr="1rem"
                  href="https://github.com/RandomBananazz/Project-IVYLG"
                  isExternal={true} aria-label="Github"/>
      <Text my="auto">Made by Jason Yuan</Text>
    </Flex>
  )
}

export default Footer