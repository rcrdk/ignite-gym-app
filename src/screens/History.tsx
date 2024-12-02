import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, Text, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { SectionList } from 'react-native'

export function History() {
  const [exercises, setExercises] = useState([
    { title: '01.12.2024', data: ['Puxada louca'] },
    { title: '30.11.2024', data: ['Puxada frontal', 'Elevação pélvica'] },
    { title: '29.11.2024', data: ['Puxada frontal', 'Remada unilateral'] },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            color="$gray200"
            fontFamily="$heading"
            fontSize="$md"
            mt="$6"
            mb="$3"
          >
            {section.title}
          </Heading>
        )}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 24 }}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={[
          { paddingTop: 6, paddingBottom: 32 },
          exercises.length === 0 && { flex: 1, justifyContent: 'center' },
        ]}
        ListEmptyComponent={() => (
          <Text
            textAlign="center"
            color="$gray200"
            fontFamily="$body"
            lineHeight="$lg"
          >
            Não há exercícios registrados ainda.{'\n'}Vamos começar hoje?
          </Text>
        )}
      />
    </VStack>
  )
}
