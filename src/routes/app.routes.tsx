import IconHistory from '@assets/history.svg'
import IconHome from '@assets/home.svg'
import IconProfile from '@assets/profile.svg'
import {
  type BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Exercise } from '@screens/Exercise'
import { History } from '@screens/History'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { Platform } from 'react-native'

import { config } from '../../config/gluestack-ui.config'

type AppStackRoutesType = {
  mainTabs: undefined
  exercise: {
    id: string
  }
}

type AppTabsRoutesType = {
  home: undefined
  profile: undefined
  history: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<
  AppStackRoutesType & AppTabsRoutesType
>

const Stack = createNativeStackNavigator<AppStackRoutesType>()
const Tab = createBottomTabNavigator<AppTabsRoutesType>()

function MainTabs() {
  const { tokens } = config

  const iconSize = tokens.space['8']

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.green500,
        tabBarInactiveTintColor: tokens.colors.gray200,
        tabBarStyle: {
          backgroundColor: tokens.colors.gray600,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 96 : 'auto',
          paddingBottom: tokens.space['10'],
          paddingTop: tokens.space['5'],
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <IconHome fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <IconHistory fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <IconProfile fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="mainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="exercise" component={Exercise} />
    </Stack.Navigator>
  )
}
