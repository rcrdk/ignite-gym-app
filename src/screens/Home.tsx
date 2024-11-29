import { HomeHeader } from '@components/HomeHeader'
import { Center, Heading, VStack } from '@gluestack-ui/themed'

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />

      <Center flex={1}>
        <Heading color="$white">Home</Heading>
      </Center>
    </VStack>
  )
}
