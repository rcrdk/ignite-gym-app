import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as InputComponent,
  InputField,
} from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
  isInvalid?: boolean
  errorMessage?: string | null
}

export function Input({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  ...props
}: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl w="$full" isInvalid={invalid}>
      <InputComponent
        h="$14"
        borderColor="$gray700"
        borderRadius="$md"
        $focus={{
          borderWidth: '$1',
          borderColor: invalid ? '$red500' : '$green500',
        }}
        $invalid={{
          borderColor: '$red500',
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

      <FormControlError>
        <FormControlErrorText color="$red500" mt="$1" mb="$2">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
