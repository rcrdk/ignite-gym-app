import { Button, Text, View } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Button> & {
  label: string
  isActive: boolean
}

export function Group({ label, isActive, ...props }: Props) {
  return (
    <Button
      minWidth="$24"
      h="$10"
      bg="$gray600"
      rounded="$md"
      alignItems="center"
      justifyContent="center"
      borderColor={isActive ? '$green500' : '$gray600'}
      mr="$3"
      sx={{
        ':active': {
          backgroundColor: '$gray500',
        },
      }}
      borderWidth="$1"
      {...props}
    >
      <Text
        color={isActive ? '$green500' : '$gray200'}
        textTransform="uppercase"
        fontSize="$xs"
        fontFamily="$heading"
      >
        {label}
      </Text>
    </Button>
  )
}

export function GroupSkeleton() {
  return <View minWidth="$24" h="$10" bg="$gray600" rounded="$md" mr="$3" />
}
