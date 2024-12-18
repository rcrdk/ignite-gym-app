import ImageBackground from '@assets/background.png'
import ImageBrand from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ToastMessage } from '@components/ToastMessage'
import {
  Center,
  Heading,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { type FormDataProps, signUpSchema } from '@schemas/signUpSchema'
import { API } from '@services/api'
import { AppError } from '@utils/AppError'
import { Controller, useForm } from 'react-hook-form'

import { notificationAddTagName } from '../notifications'

export function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
    },
  })

  const toast = useToast()
  const navigator = useNavigation()
  const { onSignIn } = useAuth()

  function handleSignInScreen() {
    navigator.goBack()
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      await API.post('/users', {
        name,
        email,
        password,
      })

      await onSignIn({ email, password })
      notificationAddTagName(name)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possivel criar a conta. Tente novamente mais tarde.'

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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
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
          <Center flex={1} py="$12" gap="$3" flexShrink={0}>
            <Heading color="$gray100">Crie sua conta</Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme a senha"
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  secureTextEntry
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              label="Criar e acessar"
              isLoading={isSubmitting}
              onPress={handleSubmit(handleSignUp)}
            />
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
