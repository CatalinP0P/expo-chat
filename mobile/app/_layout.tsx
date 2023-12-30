import { ClerkProvider } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import React from 'react'
import { useFonts } from 'expo-font'

export default function _layout() {
  const [loaded] = useFonts({
    Avenir: require('../assets/fonts/Avenir.ttf'),
  })

  if (!loaded) return null

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="settings" />
      </Stack>
    </ClerkProvider>
  )
}
