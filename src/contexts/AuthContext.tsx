import type { UserDTO } from '@dtos/UserDTO'
import { API } from '@services/api'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser'
import { createContext, type ReactNode, useEffect, useState } from 'react'
import { err } from 'react-native-svg/lib/typescript/xml'

type AuthContextOnSignInProps = {
  email: string
  password: string
}

export type AuthContextProps = {
  user: UserDTO
  onSignIn: (data: AuthContextOnSignInProps) => Promise<any>
  onSignOut: () => Promise<any>
  onGetUserData: () => Promise<any>
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function onSignIn({ email, password }: AuthContextOnSignInProps) {
    try {
      const { data } = await API.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function onSignOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function onGetUserData() {
    try {
      const loggedUser = await storageUserGet()
      if (loggedUser) setUser(loggedUser)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    onGetUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        onSignIn,
        onSignOut,
        onGetUserData,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
