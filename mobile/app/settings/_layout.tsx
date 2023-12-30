import { Stack, router } from 'expo-router'
import React from 'react'
import { Button } from 'react-native'
import routerHeaderStyle from '../../styles/routerHeaderStyle'

export default function _layout() {
  return (
    <Stack screenOptions={routerHeaderStyle}>
      <Stack.Screen
        name="personalInfo"
        options={{
          title: 'Personal Info',
          headerLeft: () => {
            return (
              <Button
                title="Back"
                onPress={() => router.push('/(tabs)/settings')}
              />
            )
          },
        }}
      />
    </Stack>
  )
}
