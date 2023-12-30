import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import CustomButton from '../customButton'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../constants/Colors'
import { useUser } from '@clerk/clerk-expo'
import { messageTypes } from '../../types/messageTypes'
import { useChat } from '../../context/chatContext'

export default function AddMessage({
  scrollToBottom,
}: {
  scrollToBottom: () => void
}) {
  const [message, setMessage] = useState('')
  const { user } = useUser()
  const { addMessage } = useChat()

  const handlePress = () => {
    if (user == null) return

    addMessage({ value: message, messageType: messageTypes.TEXT })
    setMessage('')
    scrollToBottom()
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        padding: 4,
        borderRadius: 100,
        backgroundColor: colors.black5,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          paddingHorizontal: 12,
          fontSize: 16,
        }}
        placeholder="Write something"
        value={message}
        onChangeText={(e) => setMessage(e)}
      />
      <CustomButton
        onPress={handlePress}
        style={{
          borderRadius: 100,
          backgroundColor: 'white',
          height: 52,
          width: 52,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          transform: [{ rotate: '-45deg' }],
        }}
      >
        <Ionicons name="send" color={colors.primary} size={20} />
      </CustomButton>
    </View>
  )
}
