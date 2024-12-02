import IconCategory from '@assets/body.svg'
import IconRepetitions from '@assets/repetitions.svg'
import IconSeries from '@assets/series.svg'
import { Button } from '@components/Button'
import { Box, Image, ScrollView, View } from '@gluestack-ui/themed'
import {
  Heading,
  HStack,
  Icon,
  SafeAreaView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ArrowLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'

export function Exercise() {
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigator.goBack()
  }

  return (
    <VStack flex={1}>
      <SafeAreaView bg="$gray600">
        <VStack px="$6" pt="$3" pb="$6">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={ArrowLeft} color="$green500" size="xl" />
          </TouchableOpacity>

          <HStack justifyContent="space-between" alignItems="center" mt="$3">
            <Heading
              color="$gray100"
              fontFamily="$heading"
              fontSize="$lg"
              flexShrink={1}
              lineHeight="$lg"
              pr="$6"
            >
              Puxada frontal
            </Heading>

            <HStack gap="$1" alignItems="center">
              <Icon as={IconCategory} color="$gray300" size="xs" />
              <Text
                fontFamily="text"
                color="$gray300"
                textTransform="capitalize"
                fontSize="$sm"
              >
                Costas
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <VStack px="$6" pt="$7">
          <View aspectRatio="1/1">
            <Image
              source={{
                uri: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-remada-curvada-.gif',
              }}
              // aspectRatio="1"
              w="$full"
              h="$full"
              alt="Imagem do exercício"
              rounded="$lg"
              mr="$4"
              resizeMode="cover"
            />
          </View>

          <Box bg="$gray600" rounded="$md" p="$4" mt="$6">
            <HStack justifyContent="space-evenly" alignItems="center" mb="$4">
              <HStack alignItems="center" gap="$2" py="$1">
                <Icon as={IconSeries} color="$green500" />
                <Text fontFamily="$body" color="$gray200">
                  3 séries
                </Text>
              </HStack>

              <HStack alignItems="center" gap="$2" py="$1">
                <Icon as={IconRepetitions} color="$green500" />
                <Text fontFamily="$body" color="$gray200">
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button label="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
