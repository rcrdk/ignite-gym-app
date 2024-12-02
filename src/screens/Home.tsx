import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { Text } from '@gluestack-ui/themed'
import { Center, Heading, HStack, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { FlatList } from 'react-native'

export function Home() {
  const [groups, setGroups] = useState([
    'Costas',
    'Peitoral',
    'Ombros',
    'Triceps',
    'Biceps',
  ])
  const [groupSelected, setGroupSelected] = useState('Costas')

  const [exercises, setExercises] = useState([
    'Puxada Curvada',
    'Puxada Frontal',
    'Remada Inversa',
    'Remana Unilateral',
    'Levantamento Terra',
  ])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            label={item}
            isActive={groupSelected.toLocaleLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
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

      <VStack px="$6" flex={1}>
        <HStack justifyContent="space-between" alignItems="center" mb="$5">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercícios
          </Heading>

          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  )
}
