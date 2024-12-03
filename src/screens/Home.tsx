import { ExerciseCard, ExerciseCardSkeleton } from '@components/ExerciseCard'
import { Group, GroupSkeleton } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { ToastMessage } from '@components/ToastMessage'
import type { ExerciseDTO } from '@dtos/ExerciseDTO'
import type { GroupDTO } from '@dtos/GroupDTO'
import { Text, useToast } from '@gluestack-ui/themed'
import { Heading, HStack, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { API } from '@services/api'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

export function Home() {
  const [isLoadingGroups, setIsLoadingGroups] = useState(true)
  const [isLoadingExercises, setIsLoadingExercises] = useState(true)

  const [groups, setGroups] = useState<GroupDTO[]>([])
  const [groupSelected, setGroupSelected] = useState<GroupDTO>('')
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])

  const toast = useToast()
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  function handleShowExerciseDetails(id: string) {
    navigator.navigate('exercise', { id })
  }

  function handleSelectGroup(group: GroupDTO) {
    setIsLoadingExercises(true)
    setGroupSelected(group)
  }

  async function fetchGroups() {
    try {
      setIsLoadingGroups(true)

      await wait()

      const { data } = await API.get('/groups')
      setGroups(data)
      if (data.length > 0) setGroupSelected(data.at(0))
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi carregar os grupos musculares. Tente novamente mais tarde.'

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
      setIsLoadingGroups(false)
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setExercises([])
      setIsLoadingExercises(true)

      await wait()

      const { data } = await API.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi carregar os exercícios. Tente novamente mais tarde.'

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
      setIsLoadingExercises(false)
    }
  }

  useEffect(() => {
    fetchGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (groupSelected) fetchExercisesByGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupSelected])

  // useFocusEffect(
  //   useCallback(() => {
  //     if (groupSelected) fetchExercisesByGroup()
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [groupSelected]),
  // )

  return (
    <VStack flex={1}>
      <HomeHeader />

      {isLoadingGroups ? (
        <FlatList
          data={Array.from({ length: 6 }, (_, i) => (i + 1).toString())}
          keyExtractor={(item) => item}
          renderItem={() => <GroupSkeleton />}
          horizontal
          scrollEnabled={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
          }}
          style={{
            marginVertical: 40,
            minHeight: 44,
            maxHeight: 44,
          }}
        />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Group
              label={item}
              // eslint-disable-next-line prettier/prettier
              isActive={groupSelected?.toLocaleLowerCase() === item.toLowerCase()}
              onPress={() => handleSelectGroup(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
          }}
          style={{
            marginVertical: 40,
            minHeight: 44,
            maxHeight: 44,
          }}
        />
      )}

      <VStack px="$6" flex={1}>
        <HStack justifyContent="space-between" alignItems="center" mb="$5">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercícios
          </Heading>

          {isLoadingExercises ? (
            <Text color="$gray600" bg="$gray600" rounded="$sm">
              00
            </Text>
          ) : (
            <Text color="$gray200" fontSize="$sm" fontFamily="$body">
              {exercises.length}
            </Text>
          )}
        </HStack>

        {isLoadingExercises ? (
          <FlatList
            data={Array.from({ length: 12 }, (_, i) => (i + 1).toString())}
            keyExtractor={(item) => item}
            renderItem={() => <ExerciseCardSkeleton />}
            scrollEnabled={false}
          />
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                exercise={item}
                onPress={() => handleShowExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        )}
      </VStack>
    </VStack>
  )
}
