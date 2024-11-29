import {
  Button as ButtonComponent,
  ButtonSpinner,
  Text,
} from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof ButtonComponent> & {
  label: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button({
  label,
  variant = 'solid',
  isLoading = false,
  ...props
}: Props) {
  return (
    <ButtonComponent
      w="$full"
      h="$14"
      bg={variant === 'solid' ? '$green700' : 'transparent'}
      borderWidth={variant === 'solid' ? '$0' : '$1'}
      borderColor="$green500"
      borderRadius="$sm"
      $active-bg={variant === 'solid' ? '$green500' : '$gray600'}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text
          color={variant === 'solid' ? '$white' : '$green500'}
          fontFamily="$heading"
          fontSize="$md"
        >
          {label}
        </Text>
      )}
    </ButtonComponent>
  )
}
