import { createStaticNavigation } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'

type AuthRoutesType = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesType>

const RootStack = createNativeStackNavigator<AuthRoutesType>({
  screens: {
    signIn: {
      screen: SignIn,
      linking: {
        path: 'signin',
      },
    },
    signUp: {
      screen: SignUp,
      linking: {
        path: 'signup',
      },
    },
  },
  screenOptions: {
    headerShown: false,
  },
})

export const AuthRoutes = createStaticNavigation(RootStack)
