import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { StatusBar, Text, View } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#202024',
      }}
    >
      {fontsLoaded ? (
        <Text style={{ fontFamily: 'Roboto_700Bold' }}>Home</Text>
      ) : (
        <View />
      )}

      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
    </View>
  )
}
