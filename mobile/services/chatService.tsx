import { getAuthorizedApi } from '../utils/api'

export const getAllMessages = async (authToken: string) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.get('/chat')
  return response.data
}

export const getLastMessages = async (authToken: string, number: number) => {
  try {
    const api = getAuthorizedApi(authToken)
    const response = await api.get('/chat/' + number)
    return response.data
  } catch (err) {
    console.error('AXIOS ERROR', JSON.stringify(err))
  }
}
