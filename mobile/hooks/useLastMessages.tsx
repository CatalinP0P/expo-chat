import { useEffect, useState } from 'react'
import { getLastMessages } from '../services/chatService'
import messageProps from '../types/messageProps'
import { useAuth } from '@clerk/clerk-expo'

export default function useLastMessages(number: number) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<messageProps[]>([])
  const { getToken } = useAuth()

  const fetchData = async () => {
    const token = await getToken()
    const messages = await getLastMessages(token as string, number)
    setData(messages)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { loading, data }
}
