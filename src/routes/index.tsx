import { Loading } from '@components/Loading'
import { Notification } from '@components/Notification'
import { Box } from '@gluestack-ui/themed'
import { useAuth } from '@hooks/useAuth'
import {
  DefaultTheme,
  type LinkingOptions,
  NavigationContainer,
  type ParamListBase,
} from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  type NotificationWillDisplayEvent,
  OneSignal,
  type OSNotification,
} from 'react-native-onesignal'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>()

  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  const linking: LinkingOptions<ParamListBase> = {
    prefixes: [
      'ignitegym://',
      'com.rcrdk.dev.ignitegym://',
      'exp+ignitegym://',
    ],
    config: {
      screens: {
        NotFound: {
          path: '*',
        },
      },
    },
  }

  const { user, isLoadingUserStorageData } = useAuth()

  function onHideNotification() {
    setNotification(undefined)
  }

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent) => {
      event.preventDefault()
      const response = event.getNotification()

      setNotification(response)
    }

    OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      handleNotification,
    )

    return () =>
      OneSignal.Notifications.removeEventListener(
        'foregroundWillDisplay',
        handleNotification,
      )
  }, [])

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$gray700">
      {user.id ? (
        <AppRoutes theme={theme} linking={linking} />
      ) : (
        <AuthRoutes theme={theme} linking={linking} />
      )}

      {notification && (
        <Notification data={notification} onHide={onHideNotification} />
      )}
    </Box>
  )
}
