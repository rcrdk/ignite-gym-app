import { Input as InputComponent, InputField } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
}

export function Input({ isReadOnly = false, ...props }: Props) {
  return (
    <InputComponent
      h="$14"
      borderColor="$gray700"
      borderRadius="$md"
      $focus={{
        borderWidth: '$1',
        borderColor: '$green500',
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
    >
      <InputField
        bg="$gray700"
        px="$4"
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...props}
      />
    </InputComponent>
  )
}
