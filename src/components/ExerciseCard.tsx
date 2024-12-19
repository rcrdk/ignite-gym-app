import type { ExerciseDTO } from '@dtos/ExerciseDTO'
import {
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed'
import { API } from '@services/api'
import { ChevronRightIcon } from 'lucide-react-native'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  exercise: ExerciseDTO
}

export function ExerciseCard({ exercise, ...props }: Props) {
  return (
    <TouchableOpacity {...props}>
      <HStack
        bg="$gray500"
        alignItems="center"
        p="$2"
        pr="$4"
        rounded="$md"
        mb="$3"
      >
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/exercise/thumb/${exercise.thumb}`,
          }}
          alt="Imagem do exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading
            fontSize="$md"
            color="$white"
            fontFamily="$heading"
            lineHeight="$lg"
          >
            {exercise.name}
          </Heading>

          <Text
            fontFamily="$body"
            fontSize="$xs"
            color="$gray200"
            mt="$1"
            numberOfLines={2}
          >
            {exercise.series} séries | {exercise.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={ChevronRightIcon} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}

export function ExerciseCardSkeleton() {
  return (
    <View bg="$gray600" p="$2" rounded="$md" mb="$3">
      <View w="$16" h="$16" />
    </View>
  )
}
