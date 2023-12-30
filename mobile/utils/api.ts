import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL as string,
})

export const getAuthorizedApi = (authToken: string) => {
  return axios.create({
    baseURL: process.env.EXPO_PUBLIC_SERVER_URL as string,
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  })
}
