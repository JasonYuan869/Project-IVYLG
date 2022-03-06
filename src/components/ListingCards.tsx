import { Text, VStack } from '@chakra-ui/react'
import { ListingData } from '@models/Listing'
import Card from '@components/Card'

const ListingCards = ({
  data,
  search,
}: { data: ListingData[], search: string }) => {
  const entries = !search ? data : data.filter(
    ({ name }) => name.toLowerCase().includes(search.toLowerCase()))
  return (
    <>
      {
        entries.length > 0 ?
          <VStack spacing="1rem" w="75vw">
            {entries.map((d: ListingData) => {
              return <Card key={d._id} data={d}/>
            })}
          </VStack> :
          <Text fontSize="xl">Sorry, no results were found.</Text>
      }
    </>
  )
}

export default ListingCards