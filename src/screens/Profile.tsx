import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { ToastMessage } from '@components/ToastMessage'
import {
  Center,
  Heading,
  ScrollView,
  Text,
  useToast,
  View,
  VStack,
} from '@gluestack-ui/themed'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

export function Profile() {
  const [userAvatar, setUserAvatar] = useState('http://github.com/rcrdk.png')

  const toast = useToast()

  async function handleSelectUserAvatar() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      const photoURI = photoSelected.assets[0].uri

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number
        }

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            duration: 4000,
            render: ({ id }) => (
              <ToastMessage
                id={id}
                title="Imagem grande"
                description="A imagem selecionada é muito grande. Escolha outra com até 5MB."
                action="error"
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        setUserAvatar(photoURI)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        <Center pt="$6" px="$6">
          <Avatar
            source={{ uri: userAvatar }}
            alt="Avatar do usuário"
            size="xl"
          />

          <View mt="$2" mb="$8">
            <TouchableOpacity onPress={handleSelectUserAvatar}>
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
