import type { HistoryDTO } from '@dtos/HistoryDTO'
import { Heading, HStack, Text, View, VStack } from '@gluestack-ui/themed'

type Props = {
  history: HistoryDTO
}

export function HistoryCard({ history }: Props) {
  return (
    <HStack
      px="$5"
      py="$4"
      mb="$3"
      bg="$gray600"
      rounded="$md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr="$5" flex={1}>
        <Heading
          color="$white"
          fontSize="$sm"
          fontFamily="$heading"
          textTransform="capitalize"
          lineHeight="$lg"
          numberOfLines={1}
        >
          {history.group}
        </Heading>

        <Text
          color="$gray100"
          fontSize="$md"
          fontFamily="$body"
          numberOfLines={1}
        >
          {history.name}
        </Text>
      </VStack>

      <Text color="$gray300" fontSize="$sm" fontFamily="$body">
        {history.hour}
      </Text>
    </HStack>
  )
}

export function HistoryCardSkeleton() {
  return <View bg="$gray600" rounded="$md" h="$20" mb="$2" />
}
