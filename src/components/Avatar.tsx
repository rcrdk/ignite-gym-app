import { Image } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Image> & {}

export function Avatar({ ...props }: Props) {
  return (
    <Image
      rounded="$full"
      borderWidth="$2"
      borderColor="$gray400"
      bg="$gray500"
      {...props}
    />
  )
}
