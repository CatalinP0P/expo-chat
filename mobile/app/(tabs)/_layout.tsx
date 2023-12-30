import React from 'react'
import { Tabs } from 'expo-router'
import routerHeaderStyle from '../../styles/routerHeaderStyle'
import useAuthorizedPage from '../../hooks/useAuthorizedPage'
import { Ionicons } from '@expo/vector-icons'
import { ChatProvider } from '../../context/chatContext'
import { useUser } from '@clerk/clerk-expo'
import { colors } from '../../constants/Colors'

export default function _layout() {
  const { isLoaded } = useAuthorizedPage()
  const { user } = useUser()

  if (user == null) return <></>

  if (!isLoaded) return <></>

  return (
    <ChatProvider>
      <Tabs
        screenOptions={{
          ...routerHeaderStyle,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Chat',
            tabBarIcon: ({ size, color }) => {
              return <Ionicons name="chatbox" size={size} color={color} />
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ size, color }) => {
              return <Ionicons name="settings" size={size} color={color} />
            },
          }}
        />
      </Tabs>
    </ChatProvider>
  )
}
