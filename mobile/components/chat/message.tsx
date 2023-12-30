import React, { useEffect } from 'react'
import messageProps from '../../types/messageProps'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { colors } from '../../constants/Colors'

export default function Message({ message }: { message: messageProps }) {
  const { user } = useUser()

  const status = message.userId === user?.id ? 'sent' : 'received'
  const styles = status == 'sent' ? sentStyles : receivedStyles

  useEffect(() => {
    console.log(message)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        {status == 'received' && (
          <Image
            style={styles.message__image}
            source={{ uri: user?.imageUrl }}
          />
        )}
        <View style={styles.message__container}>
          <View style={styles.message__body}>
            <Text style={styles.message__text}>{message.value}</Text>
          </View>
        </View>
        {status == 'sent' && (
          <Image
            style={styles.message__image}
            source={{ uri: user?.imageUrl }}
          />
        )}
      </View>
    </View>
  )
}

const receivedStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    maxWidth: '80%',
    paddingVertical: 4,
  },

  message: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },

  message__container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  message__image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: colors.black10,
  },

  message__body: {
    borderTopEndRadius: 12,
    borderEndStartRadius: 12,
    borderEndEndRadius: 12,
    backgroundColor: colors.white,
    padding: 12,
  },

  message__text: {
    color: colors.black,
  },
})

const sentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    maxWidth: '80%',
    paddingVertical: 4,
  },

  message: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },

  message__container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  message__image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: colors.black10,
  },

  message__body: {
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    borderEndStartRadius: 12,
    backgroundColor: colors.primary,
    padding: 12,
  },

  message__text: {
    color: colors.white,
  },
})
