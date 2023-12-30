import React from 'react'
import { StyleSheet, ViewProps } from 'react-native'
import { View } from 'react-native'
import { colors } from '../constants/Colors'

interface ContainerProps extends ViewProps {
  children?: React.ReactNode
  justifyContent?: 'center' | 'flex-start' | 'flex-end'
}

export default function Container({
  children,
  style,
  justifyContent = 'center',
}: ContainerProps) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingHorizontal: 8,
      display: 'flex',
      justifyContent: justifyContent,
      marginHorizontal: 'auto',
      flex: 1,
    },
  })

  return <View style={[styles.container, style]}>{children}</View>
}
