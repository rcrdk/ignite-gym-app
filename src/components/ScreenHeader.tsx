import { Center, Heading, SafeAreaView } from '@gluestack-ui/themed'

type Props = { title: string }

export function ScreenHeader({ title }: Props) {
  return (
    <SafeAreaView bg="$gray600">
      <Center py="$5">
        <Heading color="$gray100" fontSize="$xl" fontFamily="$heading">
          {title}
        </Heading>
      </Center>
    </SafeAreaView>
  )
}
