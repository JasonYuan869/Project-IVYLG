import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Button, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const DeleteModal = ({
  name,
  id,
  isOpen,
  onClose,
}: { name: string, id: string, isOpen: boolean, onClose: () => void }) => {
  const router = useRouter()

  const deleteListing = async () => {
    try {
      await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      })
    } catch (e) {
      console.error(e)
    }
    onClose()
    // refresh the page to reload the listings
    router.reload()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Are you sure you want to delete this listing?</ModalHeader>
        <ModalBody>{name} will be deleted forever!</ModalBody>
        <ModalFooter>
          <HStack spacing={1}>
            <Button colorScheme="linkedin" onClick={onClose}>Cancel</Button>
            <Button colorScheme="red"
                    onClick={deleteListing}>Delete</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

}

export default DeleteModal