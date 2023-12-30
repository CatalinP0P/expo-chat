import { Stack } from 'expo-router'
import React from 'react'
import routerHeaderStyle from '../../styles/routerHeaderStyle'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        ...routerHeaderStyle,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Register',
        }}
      />
    </Stack>
  )
}
