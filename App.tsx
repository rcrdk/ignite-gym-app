import { Loading } from '@components/Loading'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider, View } from '@gluestack-ui/themed'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'
import { StatusBar } from 'react-native'

import { config } from './config/gluestack-ui.config'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <GluestackUIProvider config={config}>
      <View flex={1} bg="$gray700">
        {fontsLoaded ? <SignUp /> : <Loading />}
      </View>

      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
    </GluestackUIProvider>
  )
}
