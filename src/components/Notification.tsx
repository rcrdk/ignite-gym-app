import { HStack, Icon, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { Bell, X } from 'lucide-react-native'
import { Linking } from 'react-native'
import type { OSNotification } from 'react-native-onesignal'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  data: OSNotification
  onHide: () => void
}

export function Notification({ data, onHide }: Props) {
  function handleOnPress() {
    if (data.launchURL) {
      Linking.openURL(data.launchURL)
    }

    onHide()
  }

  return (
    <Pressable
      onPress={handleOnPress}
      position="absolute"
      top={0}
      left={0}
      w="$full"
      bg="$green500"
    >
      <SafeAreaView>
        <HStack py="$6" px="$6">
          <Icon as={Bell} color="$white" size="xl" />

          <VStack gap={4} px="$3" flex={1}>
            <Text fontFamily="$heading" color="$white">
              {data.title}
            </Text>

            <Text color="$white" fontFamily="$body" opacity="$75">
              {data.body}
            </Text>
          </VStack>

          <Pressable onPress={onHide}>
            <Icon as={X} color="$white" opacity="$75" />
          </Pressable>
        </HStack>
      </SafeAreaView>
    </Pressable>
  )
}
