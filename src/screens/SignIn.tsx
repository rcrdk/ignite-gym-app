import ImageBackground from '@assets/background.png'
import ImageBrand from '@assets/logo.svg'
import { Center, Image, SafeAreaView, Text, VStack } from '@gluestack-ui/themed'

export function SignIn() {
  return (
    <VStack flex={1} bg="$gray700">
      <Image
        source={ImageBackground}
        defaultSource={ImageBackground}
        alt="Pessoas praticando exercício"
        w="$full"
        h={624}
        position="absolute"
      />

      <SafeAreaView>
        <Center pt="$12" pb="$24">
          <ImageBrand />
          <Text color="$gray100" fontSize="$sm" mt="$1">
            Treine sua mente e seu corpo
          </Text>
        </Center>
      </SafeAreaView>

      <Center py="$24"></Center>
    </VStack>
  )
}
