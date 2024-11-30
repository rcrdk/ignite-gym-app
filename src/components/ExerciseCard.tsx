import {
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { ChevronRightIcon } from 'lucide-react-native'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {}

export function ExerciseCard({ ...props }: Props) {
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
            uri: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-remada-curvada-.gif',
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
            Puxada inclinada
          </Heading>

          <Text
            fontFamily="$body"
            fontSize="$xs"
            color="$gray200"
            mt="$1"
            numberOfLines={2}
          >
            3 séries | 12 repetições
          </Text>
        </VStack>

        <Icon as={ChevronRightIcon} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
