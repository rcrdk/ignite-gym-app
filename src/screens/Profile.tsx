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
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { type FormDataProps, profileSchema } from '@schemas/profileSchema'
import { API } from '@services/api'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'

export function Profile() {
  const { user, onUpdateUserProfile } = useAuth()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProps>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

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

  async function handleSaveProfile(data: FormDataProps) {
    try {
      await wait()

      const userUpdated = user
      userUpdated.name = data.name

      await API.put(`/users`, {
        name: data.name,
        old_password: data.password,
        password: data.new_password,
      })

      await onUpdateUserProfile(userUpdated)

      toast.show({
        placement: 'top',
        duration: 4000,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Dados salvos."
            description="As informações do seu perfil foram atualizadas."
            action="success"
            onClose={() => toast.close(id)}
          />
        ),
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível salvar seus dados. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        duration: 4000,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Ocorreu um erro."
            description={message}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      })
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
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                  autoCapitalize="words"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  bg="$gray600"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                  autoCapitalize="words"
                  keyboardType="email-address"
                  isReadOnly
                />
              )}
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
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha atual"
                  bg="$gray600"
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  bg="$gray600"
                  onChangeText={onChange}
                  errorMessage={errors.new_password?.message}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  bg="$gray600"
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                  secureTextEntry
                />
              )}
            />

            <Button
              label="Salvar informações"
              isLoading={isSubmitting}
              onPress={handleSubmit(handleSaveProfile)}
            />
          </VStack>
        </Center>
      </ScrollView>
    </VStack>
  )
}
