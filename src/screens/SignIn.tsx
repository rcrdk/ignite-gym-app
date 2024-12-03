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
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import type { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Informe o e-mail.')
    .email('Informe um email válido.'),
  password: z.string().min(1, 'Informe a senha.'),
})

type FormDataProps = z.infer<typeof signInSchema>

export function SignIn() {
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

  function handleSignIn({ email, password }: FormDataProps) {
    console.log({ email, password })
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
                onPress={handleCreateNewAccount}
              />
            </Center>
          </SafeAreaView>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
