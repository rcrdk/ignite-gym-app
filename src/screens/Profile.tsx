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

// const profileSchema = z
//   .object({
//     name: z.string().min(1, 'Informe o nome.'),
//     email: z
//       .string()
//       .min(1, 'Informe o e-mail.')
//       .email('Informe um email válido.'),
//     password: z
//       .string()
//       .min(1, 'Informe a senha.')
//       .min(6, 'Informe a senha com ao menos 6 digitos.'),
//     password_confirm: z.string().min(1, 'Confirme a senha.'),
//   })
//   .superRefine(({ password_confirm, password }, ctx) => {
//     if (password_confirm !== password) {
//       ctx.addIssue({
//         code: 'custom',
//         message: 'As senhas não são iguais.',
//         path: ['password_confirm'],
//       })
//     }
//   })

// type FormDataProps = z.infer<typeof profileSchema>

export function Profile() {
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors, isSubmitting },
  // } = useForm<FormDataProps>({
  //   resolver: zodResolver(profileSchema),
  //   defaultValues: {
  //     name: 'Ricardo August Kowalski',
  //     email: 'ricardoakowalski@gmail.com',
  //     current_password: '',
  //     new_password: '',
  //     password_confirm: '',
  //   },
  // })

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

  // function handleSaveProfile({
  //   name,
  //   email,
  //   password,
  //   password_confirm,
  // }: FormDataProps) {
  //   console.log({ name, email, password, password_confirm })
  // }

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
