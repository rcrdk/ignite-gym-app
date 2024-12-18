import { Loading } from '@components/Loading'
import { AuthContextProvider } from '@contexts/AuthContext'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider, View } from '@gluestack-ui/themed'
import { Routes } from '@routes/index'
import { Platform, StatusBar } from 'react-native'
import { OneSignal } from 'react-native-onesignal'

import { config } from './config/gluestack-ui.config'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  const appIdOneSignal =
    Platform.OS === 'ios'
      ? process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID_IOS
      : process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID_ANDROID

  OneSignal.initialize(appIdOneSignal)
  OneSignal.Notifications.requestPermission(true)

  return (
    <GluestackUIProvider config={config}>
      <AuthContextProvider>
        <View flex={1} bg="$gray700">
          {fontsLoaded ? <Routes /> : <Loading />}
        </View>
      </AuthContextProvider>

      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
    </GluestackUIProvider>
  )
}
