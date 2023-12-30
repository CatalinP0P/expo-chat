import { messageTypes } from './messageTypes'

export default interface messageProps {
  id: number
  userId: string
  messageType: messageTypes
  value: string
  createdAt: string
}
