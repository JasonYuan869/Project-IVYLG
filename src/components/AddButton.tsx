import { IconButton, IconButtonProps, Link } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const AddButton = (props: IconButtonProps) => {
  return (
    <NextLink href="/add" passHref>
      <IconButton {...props} as={Link} rounded="full" icon={<AddIcon/>}/>
    </NextLink>

  )
}

export default AddButton