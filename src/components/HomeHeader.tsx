import {
  Heading,
  HStack,
  Icon,
  SafeAreaView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { LogOutIcon } from 'lucide-react-native'

import { Avatar } from './Avatar'

export function HomeHeader() {
  return (
    <SafeAreaView bg="$gray600">
      <HStack py="$5" px="$8" gap="$4" alignItems="center">
        <Avatar
          source={{ uri: 'https://github.com/rcrdk.png' }}
          alt="Avatar do usuário"
          w="$14"
          h="$14"
        />

        <VStack justifyContent="center" flex={1}>
          <Text color="$gray100" fontSize="$sm" lineHeight="$md">
            Olá,
          </Text>
          <Heading color="$gray100" fontSize="$md" lineHeight="$md">
            Ricardo
          </Heading>
        </VStack>

        <Icon as={LogOutIcon} color="$gray200" size="xl" />
      </HStack>
    </SafeAreaView>
  )
}
