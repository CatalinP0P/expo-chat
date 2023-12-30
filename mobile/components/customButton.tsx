import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native'
import { colors } from '../constants/Colors'

interface CustomButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
}

export default function CustomButton({
  children,
  style,
  ...otherProps
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      //eslint-disable-next-line
      style={{ ...styles.button, ...(style as any) }}
      {...otherProps}
    >
      <Text style={styles.button__text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  button__text: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Avenir',
    color: colors.primary,
  },
})
