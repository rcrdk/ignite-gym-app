import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import {
  Center,
  Heading,
  ScrollView,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed'
import { TouchableOpacity } from 'react-native'

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        <Center pt="$6" px="$6">
          <Avatar
            source={{ uri: 'https://github.com/rcrdk.png' }}
            alt="Avatar do usuário"
            size="xl"
          />

          <View mt="$2" mb="$8">
            <TouchableOpacity>
              <Text color="$green500" fontFamily="$heading" fontSize="$md">
                Alterar foto
              </Text>
            </TouchableOpacity>
          </View>

          <VStack gap="$2" w="$full">
            <Input placeholder="Nome" bg="$gray600" />

            <Input
              value="ricardoakowalski@gmail.com"
              bg="$gray600"
              isReadOnly
            />
          </VStack>

          <Heading
            color="$gray200"
            fontFamily="$heading"
            fontSize="$md"
            mt="$8"
            mb="$1"
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <VStack gap="$2" w="$full">
            <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />

            <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />

            <Input
              placeholder="Confirme a nova senha"
              bg="$gray600"
              secureTextEntry
            />

            <Button label="Confirme a nova senha" />
          </VStack>
        </Center>
      </ScrollView>
    </VStack>
  )
}
