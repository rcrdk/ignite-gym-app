import IconCategory from '@assets/body.svg'
import IconRepetitions from '@assets/repetitions.svg'
import IconSeries from '@assets/series.svg'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { ToastMessage } from '@components/ToastMessage'
import type { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Box, Image, ScrollView, useToast, View } from '@gluestack-ui/themed'
import {
  Heading,
  HStack,
  Icon,
  SafeAreaView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { API } from '@services/api'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import { ArrowLeft } from 'lucide-react-native'
import { useCallback, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'

import {
  notificationLastExercise,
  notificationWeekExercises,
} from '../notifications'

type RouteParams = {
  id: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false)

  const navigator = useNavigation<AppNavigatorRoutesProps>()
  const router = useRoute()
  const toast = useToast()

  const { id } = router.params as RouteParams

  function handleGoBack() {
    navigator.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setExercise({} as ExerciseDTO)
      setIsLoading(true)

      await wait()

      const { data } = await API.get(`/exercises/${id}`)
      setExercise(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi carregar o exercício. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        duration: 4000,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Ocorreu um erro."
            description={message}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onExerciseHistoryRegister() {
    try {
      setIsSubmittingRegister(true)
      await wait()

      await API.post('/history', { exercise_id: id })

      await notificationWeekExercises()

      notificationLastExercise()

      // toast.show({
      //   placement: 'top',
      //   duration: 4000,
      //   render: ({ id }) => (
      //     <ToastMessage
      //       id={id}
      //       title="Exercício realizado."
      //       description="Acesse o histórico para ver todops os registros."
      //       action="success"
      //       onClose={() => toast.close(id)}
      //     />
      //   ),
      // })

      // navigator.goBack()
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível marca ro exercício como realizado. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        duration: 4000,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Ocorreu um erro."
            description={message}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsSubmittingRegister(false)
    }
  }

  function handleExerciseHistoryRegister() {
    Alert.alert(
      'Novo exercício',
      `Deseja marcar "${exercise.name}" como realizado agora?`,
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          style: 'default',
          text: 'Confirmar',
          onPress: async () => await onExerciseHistoryRegister(),
        },
      ],
    )
  }

  useFocusEffect(
    useCallback(() => {
      fetchExerciseDetails()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]),
  )

  return (
    <VStack flex={1}>
      <SafeAreaView bg="$gray600">
        <VStack px="$6" pt="$3" pb="$6">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={ArrowLeft} color="$green500" size="xl" />
          </TouchableOpacity>

          <HStack justifyContent="space-between" alignItems="center" mt="$3">
            {isLoading ? (
              <Heading
                color="$gray400"
                bg="$gray400"
                flexShrink={1}
                mr="$6"
                rounded="$sm"
              >
                Nome do exercicio
              </Heading>
            ) : (
              <Heading
                color="$gray100"
                fontFamily="$heading"
                fontSize="$lg"
                flexShrink={1}
                lineHeight="$lg"
                pr="$6"
              >
                {exercise.name}
              </Heading>
            )}

            <HStack gap="$1" alignItems="center">
              <Icon
                as={IconCategory}
                color="$gray300"
                stroke="$gray300"
                size="xs"
              />
              {isLoading ? (
                <Text color="$gray400" bg="$gray400" rounded="$sm">
                  Categoria
                </Text>
              ) : (
                <Text
                  fontFamily="text"
                  color="$gray300"
                  textTransform="capitalize"
                  fontSize="$sm"
                >
                  {exercise.group}
                </Text>
              )}
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
            {isLoading ? (
              <View w="$full" h="$full" rounded="$lg" bg="$gray600">
                <Loading />
              </View>
            ) : (
              <Image
                source={{
                  uri: `${API.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                w="$full"
                h="$full"
                alt="Imagem do exercício"
                rounded="$lg"
                mr="$4"
                resizeMode="cover"
              />
            )}
          </View>

          <Box bg="$gray600" rounded="$md" p="$4" mt="$6">
            <HStack justifyContent="space-evenly" alignItems="center" mb="$4">
              <HStack alignItems="center" gap="$2" py="$1">
                <Icon as={IconSeries} color="$green500" stroke="$green500" />
                {isLoading ? (
                  <Text color="$gray400" bg="$gray400" rounded="$sm">
                    000 séries
                  </Text>
                ) : (
                  <Text fontFamily="$body" color="$gray200">
                    {exercise.series} séries
                  </Text>
                )}
              </HStack>

              <HStack alignItems="center" gap="$2" py="$1">
                <Icon
                  as={IconRepetitions}
                  color="$green500"
                  stroke="$green500"
                />
                {isLoading ? (
                  <Text color="$gray400" bg="$gray400" rounded="$sm">
                    000 repetições
                  </Text>
                ) : (
                  <Text fontFamily="$body" color="$gray200">
                    {exercise.repetitions} repetições
                  </Text>
                )}
              </HStack>
            </HStack>

            {isLoading ? (
              <View bg="$gray400" w="$full" h="$14" borderRadius="$sm" />
            ) : (
              <Button
                label="Marcar como realizado"
                isLoading={isSubmittingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            )}
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
