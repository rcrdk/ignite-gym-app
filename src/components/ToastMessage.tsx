import {
  HStack,
  Icon,
  Pressable,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed'
import { X } from 'lucide-react-native'

type Props = {
  id: string
  title: string
  description?: string
  action?: 'error' | 'success'
  onClose: () => void
}

export function ToastMessage({
  id,
  title,
  description,
  action = 'success',
  onClose,
}: Props) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      bg={action === 'success' ? '$green500' : '$red500'}
      mt="$10"
      rounded="$xl"
    >
      <HStack gap="$2" w="$full">
        <VStack space="xs" flex={1}>
          <ToastTitle color="$white" fontFamily="$heading">
            {title}
          </ToastTitle>

          {description && (
            <ToastDescription fontFamily="$body" color="$white">
              {description}
            </ToastDescription>
          )}
        </VStack>

        <Pressable
          alignSelf="flex-start"
          p="$1"
          onPress={onClose}
          flexShrink={1}
        >
          <Icon as={X} color="$coolGray50" size="md" />
        </Pressable>
      </HStack>
    </Toast>
  )
}
