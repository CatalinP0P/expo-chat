import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../constants/Colors'

interface GradientContainerProps {
  children: React.ReactNode
}

export default function GradientContainer({
  children,
}: GradientContainerProps) {
  return (
    <LinearGradient
      style={{ flex: 1, justifyContent: 'center' }}
      colors={[colors.secondary, colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.75 }}
    >
      {children}
    </LinearGradient>
  )
}
