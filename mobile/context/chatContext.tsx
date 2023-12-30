import { useUser } from '@clerk/clerk-expo'
import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import messageProps from '../types/messageProps'
import { io } from 'socket.io-client'
import useLastMessages from '../hooks/useLastMessages'
import { messageTypes } from '../types/messageTypes'

interface chatContextProps {
  loading: boolean
  messages: messageProps[]
  addMessage: (message: messageRequestProps) => unknown
}

interface messageRequestProps {
  messageType: messageTypes
  value: string
}

const ChatContext = createContext<chatContextProps>({
  loading: true,
  messages: [],
  addMessage: () => {},
})

export const useChat = () => {
  return useContext(ChatContext)
}

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  //eslint-disable-next-line
  const [socket, setSocket] = useState<any>(null)
  const [messages, setMessages] = useState<messageProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useUser()

  useEffect(() => {
    if (!socket) {
      setSocket(io(process.env.EXPO_PUBLIC_SERVER_URL as string))
    }

    return () => {
      socket?.disconnect()
    }
  }, [socket])

  useEffect(() => {
    if (!socket) return

    socket.on('connect', () => {
      console.log('socket connected')
    })

    socket.on('receive-message', (message: messageProps) => {
      setMessages((oldMessages: messageProps[]) => {
        return [...oldMessages, message]
      })
    })

    return () => {
      socket.off('connect')
      socket.off('receive-message')
    }
  }, [socket])

  const messagesData = useLastMessages(100)

  useEffect(() => {
    if (messagesData.loading) return
    setMessages(messagesData.data)
    setLoading(false)
  }, [messagesData.loading])

  const addMessage = (message: messageRequestProps) => {
    if (user == null) return

    const messageTypeIndex = message.messageType

    const messageTypeString = messageTypes[messageTypeIndex]

    const newMessage: messageProps = {
      id: Math.random() * 1000,
      userId: user?.id,
      messageType: message.messageType,
      value: message.value,
      createdAt: new Date().toString(),
    }

    setMessages((oldMessages) => {
      return [...oldMessages, newMessage]
    })

    console.log(messageTypeString)

    socket.emit('send-message', {
      userId: user?.id,
      messageType: messageTypeString,
      value: message.value,
    })
  }

  return (
    <ChatContext.Provider value={{ loading, messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  )
}
