import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

export function HistoryCard() {
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
          Costas
        </Heading>

        <Text
          color="$gray100"
          fontSize="$md"
          fontFamily="$body"
          numberOfLines={1}
        >
          Puxada frontal
        </Text>
      </VStack>

      <Text color="$gray300" fontSize="$sm" fontFamily="$body">
        08:56
      </Text>
    </HStack>
  )
}
