import { HistoryCard, HistoryCardSkeleton } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { ToastMessage } from '@components/ToastMessage'
import type { HistoryGroupDTO } from '@dtos/HistoryDTO'
import { Heading, Text, useToast, VStack } from '@gluestack-ui/themed'
import { useFocusEffect } from '@react-navigation/native'
import { API } from '@services/api'
import { AppError } from '@utils/AppError'
import { wait } from '@utils/wait'
import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState<HistoryGroupDTO[]>([])

  const skeletons = Array.from({ length: 3 }, (_, i) => {
    return {
      title: i,
      data: Array.from({ length: 3 }, (_, i) => i + 1),
    }
  })

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)
      await wait()
      const { data } = await API.get('/history')
      setHistory(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi carregar o histórico de exercícios. Tente novamente mais tarde.'

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

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <SectionList
          sections={skeletons}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <HistoryCardSkeleton />}
          // eslint-disable-next-line prettier/prettier
          renderSectionHeader={() => <Heading color="$gray600" bg="$gray600" lineHeight="$lg" rounded="$sm" mt="$6" mb="$3" alignSelf="flex-start">Carregando...</Heading>}
          style={{ paddingHorizontal: 24 }}
          contentContainerStyle={{ paddingTop: 6, paddingBottom: 32 }}
          scrollEnabled={false}
          stickySectionHeadersEnabled={false}
        />
      ) : (
        <SectionList
          sections={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard history={item} />}
          // eslint-disable-next-line prettier/prettier
          renderSectionHeader={({ section }) => <Heading color="$gray200" fontFamily="$heading" fontSize="$md" mt="$6" mb="$3">{section.title}</Heading>}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 24 }}
          stickySectionHeadersEnabled={false}
          // eslint-disable-next-line prettier/prettier
          contentContainerStyle={[{ paddingTop: 6, paddingBottom: 32 }, history.length === 0 && { flexGrow: 1, justifyContent: 'center' }]}
          // eslint-disable-next-line prettier/prettier
          ListEmptyComponent={() => <Text textAlign="center" color="$gray200" fontFamily="$body" lineHeight="$lg">Não há exercícios registrados ainda.{'\n'}Vamos começar hoje?</Text>}
        />
      )}
    </VStack>
  )
}
