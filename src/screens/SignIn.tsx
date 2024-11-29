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
import type { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  const navigator = useNavigation<AuthNavigatorRoutesProps>()

  function handleCreateNewAccount() {
    navigator.navigate('signUp')
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
            <Heading color="$gray100">Acesse a conta</Heading>

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              enterKeyHint="next"
            />

            <Input placeholder="Senha" enterKeyHint="go" secureTextEntry />

            <Button label="Acessar" isLoading={false} />
          </Center>

          <SafeAreaView>
            <Center gap="$2" pb="$4">
              <Text color="$gray100" fontSize="$md" fontFamily="$body">
                Ainda não tem acesso?
              </Text>
              <Button
                label="Criar Conta"
                variant="outline"
                onPress={handleCreateNewAccount}
              />
            </Center>
          </SafeAreaView>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
