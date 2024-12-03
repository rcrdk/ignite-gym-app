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
import { useNavigation } from '@react-navigation/native'
import { API } from '@services/api'
import { AppError } from '@utils/AppError'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpSchema = z
  .object({
    name: z.string().min(1, 'Informe o nome.'),
    email: z
      .string()
      .min(1, 'Informe o e-mail.')
      .email('Informe um email válido.'),
    password: z
      .string()
      .min(1, 'Informe a senha.')
      .min(6, 'Informe a senha com ao menos 6 digitos.'),
    password_confirm: z.string().min(1, 'Confirme a senha.'),
  })
  .superRefine(({ password_confirm, password }, ctx) => {
    if (password_confirm !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não são iguais.',
        path: ['password_confirm'],
      })
    }
  })

type FormDataProps = z.infer<typeof signUpSchema>

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

  function handleSignInScreen() {
    navigator.goBack()
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await API.post('/users', {
        name,
        email,
        password,
      })

      console.log(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possivel criar a conta. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        duration: 5000,
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
