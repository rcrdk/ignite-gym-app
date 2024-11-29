import ImageBackground from '@assets/background.png'
import ImageBrand from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import {
  Center,
  Heading,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const navigator = useNavigation()

  function handleSignInScreen() {
    navigator.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
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

        <VStack flex={1} px="$10">
          <Center flex={1} py="$24" gap="$3">
            <Heading color="$gray100">Crie sua conta</Heading>

            <Input placeholder="Nome" enterKeyHint="next" />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              enterKeyHint="next"
            />
            <Input placeholder="Senha" enterKeyHint="go" secureTextEntry />

            <Button label="Criar e acessar" isLoading={false} />
          </Center>

          <SafeAreaView>
            <Center pb="$4">
              <Button
                label="Já tenho uma conta"
                variant="outline"
                onPress={handleSignInScreen}
              />
            </Center>
          </SafeAreaView>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
