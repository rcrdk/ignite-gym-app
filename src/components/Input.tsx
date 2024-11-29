import { Input as InputComponent, InputField } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField>

export function Input({ ...props }: Props) {
  return (
    <InputComponent
      bg="$gray700"
      h="$14"
      px="$4"
      borderColor="$gray700"
      borderRadius="$md"
      $focus={{
        borderWidth: '$1',
        borderColor: '$green500',
      }}
    >
      <InputField
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...props}
      />
    </InputComponent>
  )
}
