import AvatarPlaceholder from '@assets/userPhotoDefault.png'
import {
  Heading,
  HStack,
  Icon,
  SafeAreaView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useAuth } from '@hooks/useAuth'
import { API } from '@services/api'
import { LogOutIcon } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'

import { Avatar } from './Avatar'

export function HomeHeader() {
  const { user, onSignOut } = useAuth()

  return (
    <SafeAreaView bg="$gray600">
      <HStack py="$5" px="$6" gap="$4" alignItems="center">
        <Avatar
          source={
            user.avatar
              ? { uri: `${API.defaults.baseURL}/avatar/${user.avatar}` }
              : AvatarPlaceholder
          }
          alt="Avatar do usuário"
          size="sm"
        />

        <VStack justifyContent="center" flex={1}>
          <Text color="$gray100" fontSize="$sm" lineHeight="$md">
            Olá,
          </Text>
          <Heading color="$gray100" fontSize="$md" lineHeight="$md">
            {user.name}
          </Heading>
        </VStack>

        <TouchableOpacity onPress={onSignOut}>
          <Icon as={LogOutIcon} color="$gray200" size="xl" />
        </TouchableOpacity>
      </HStack>
    </SafeAreaView>
  )
}
