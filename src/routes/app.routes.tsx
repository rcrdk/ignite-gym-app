import IconHistory from '@assets/history.svg'
import IconHome from '@assets/home.svg'
import IconProfile from '@assets/profile.svg'
import {
  type BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { createStaticNavigation } from '@react-navigation/native'
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

const { tokens } = config

const iconSize = tokens.space['8']

const MainTabs = createBottomTabNavigator<AppTabsRoutesType>({
  screens: {
    home: {
      screen: Home,
      linking: {
        path: 'home',
      },
      options: {
        tabBarIcon: ({ color }) => (
          <IconHome fill={color} width={iconSize} height={iconSize} />
        ),
      },
    },
    history: {
      screen: History,
      linking: {
        path: 'history',
      },
      options: {
        tabBarIcon: ({ color }) => (
          <IconHistory fill={color} width={iconSize} height={iconSize} />
        ),
      },
    },
    profile: {
      screen: Profile,
      linking: {
        path: 'profile',
      },
      options: {
        tabBarIcon: ({ color }) => (
          <IconProfile fill={color} width={iconSize} height={iconSize} />
        ),
      },
    },
  },
  screenOptions: {
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
  },
})

export const RootStack = createNativeStackNavigator<AppStackRoutesType>({
  screens: {
    mainTabs: {
      screen: MainTabs,
    },
    exercise: {
      screen: Exercise,
      linking: {
        path: '/exercise/:id',
        parse: {
          id: (id: string) => id,
        },
      },
    },
  },
  screenOptions: {
    headerShown: false,
  },
})

export const AppRoutes = createStaticNavigation(RootStack)
