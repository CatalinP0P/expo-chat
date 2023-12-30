import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import useAuthorizedPage from '../../hooks/useAuthorizedPage'
import { ScrollView } from 'react-native-gesture-handler'
import AddMessage from '../../components/chat/addMessage'
import Message from '../../components/chat/message'
import { useChat } from '../../context/chatContext'
import messageProps from '../../types/messageProps'

export default function Index() {
  const scrollViewRef = useRef(null)
  const { isLoaded } = useAuthorizedPage()
  const { loading, messages } = useChat()

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      //eslint-disable-next-line
      const element: any = scrollViewRef.current
      element.scrollToEnd({ animated: true })
    }
  }

  useEffect(() => {
    if (loading) return

    setTimeout(() => {
      scrollToBottom()
    }, 250)
  }, [loading])

  if (!isLoaded || loading) return <></>

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          paddingHorizontal: 8,
        }}
      >
        {messages?.map((message: messageProps) => (
          <Message message={message} key={message.id} />
        ))}
      </ScrollView>
      <View style={{ padding: 16 }}>
        <AddMessage scrollToBottom={scrollToBottom} />
      </View>
    </View>
  )
}
