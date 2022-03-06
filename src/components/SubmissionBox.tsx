import { useRouter } from 'next/router'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface SubmissionProps {
  modifyId?: string
}

// modifyId will contain the id if we are modifying an existing submission,
// otherwise it will be null to signify that we are creating a new submission.
const SubmissionBox = ({ modifyId }: SubmissionProps) => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [image, setImage] = useState<File>()
  const [error, setError] = useState('')

  useEffect(() => {
    if (modifyId) {
      fetch(`/api/listings/${modifyId}`, {
        method: 'GET',
      }).then((res) => res.json().then(({ data }) => {
        setName(data.name)
        setAbout(data.about)
      }))
    }
  }, [])

  const createSubmission = async (
    name: string, about: string, image: string) => {
    const res = await fetch('/api/listings', {
      method: 'POST',
      body: JSON.stringify({ name, about, image }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await res.json()
    if (json.success) {
      router.push('/')
    }
  }

  const modifySubmission = async (
    id: string, name: string, about: string, image: string) => {
    const body = {
      name: undefined,
      about: undefined,
      image: undefined,
    }
    if (name !== '') {
      // @ts-ignore
      body.name = name
    }
    if (about !== '') {
      // @ts-ignore
      body.about = about
    }
    if (image !== '') {
      // @ts-ignore
      body.image = image
    }

    const res = await fetch(`/api/listings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await res.json()
    if (json.success) {
      router.push('/')
    } else {
      throw new Error(json.error)
    }
  }

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!modifyId && (name === '' || about === '')) {
      setError('Fields cannot be empty.')
      return
    }

    if (!modifyId && !image) {
      setError('You must attach an image file.')
      return
    }

    if (name === '' && about === '' && !image) {
      setError('Fields cannot all be empty.')
      return
    }

    if (name.length > 60) {
      setError('Name cannot be more than 60 characters.')
      return
    }
    if (about.length > 2000) {
      setError('Description cannot be more than 2000 characters.')
      return
    }

    // Upload image to GCS
    try {
      if (image) {
        const formData = new FormData()
        formData.append(
          'image',
          image as Blob,
          name.replace(/\s+/g, '-').toLowerCase() +
          Math.floor(new Date().getTime() / 1000),
        )
        console.log(formData.getAll('image'))
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const json = await res.json()
        if (modifyId) {
          await modifySubmission(modifyId, name, about, json.data)
        } else {
          await createSubmission(name, about, json.data)
        }
      } else {
        await modifySubmission(modifyId!, name, about, '')
      }
    } catch (e) {
      console.error(e)
      setError('An unknown error occurred. Please try again.')
      return
    }

  }

  return (
    <Flex w="75%">
      <FormControl isInvalid={error !== ''}>
        <Stack m=".5rem" spacing="1rem">
          <Input
            name="name"
            type="text"
            variant="outline"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            name="about"
            placeholder="Description"
            resize="vertical"
            value={about}
            h="10rem"
            onChange={(e) => setAbout(e.target.value)}
          />
          <Flex borderRadius="lg" borderWidth="1px" p="1rem">
            <Text my="auto" mr="1rem" fontWeight="bold">
              Image:
            </Text>
            <input
              name="image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0])
                }
              }}
            />
          </Flex>
        </Stack>
        <Button
          type="submit"
          onClick={onSubmit}
          float="right"
          mr="1rem"
          mt="1rem"
          colorScheme="green"
        >
          Submit
        </Button>
        <FormErrorMessage ml="0.5rem">{error}</FormErrorMessage>
      </FormControl>

    </Flex>
  )

}

export default SubmissionBox