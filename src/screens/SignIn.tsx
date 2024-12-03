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
import type { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { type FormDataProps, signInSchema } from '@schemas/signInSchema'
import { AppError } from '@utils/AppError'
import { Controller, useForm } from 'react-hook-form'

export function SignIn() {
  const { onSignIn } = useAuth()
  const toast = useToast()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigator = useNavigation<AuthNavigatorRoutesProps>()

  function handleCreateNewAccount() {
    navigator.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      await onSignIn({ email, password })
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'

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
          <Center flex={1} py="$12" gap="$3">
            <Heading color="$gray100">Acesse a conta</Heading>

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
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleSignIn)}
                />
              )}
            />

            <Button
              label="Acessar"
              isLoading={isSubmitting}
              onPress={handleSubmit(handleSignIn)}
            />
          </Center>

          <SafeAreaView>
            <Center gap="$2" pb="$4">
              <Text color="$gray100" fontSize="$md" fontFamily="$body">
                Ainda não tem acesso?
              </Text>
              <Button
                label="Criar Conta"
                variant="outline"
                onPressIn={handleCreateNewAccount}
              />
            </Center>
          </SafeAreaView>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
