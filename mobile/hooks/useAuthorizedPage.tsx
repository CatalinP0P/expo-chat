import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router'

export default function useAuthorizedPage() {
  const { isLoaded, user } = useUser()

  useEffect(() => {
    if (!isLoaded) return
    if (user != null) return

    setTimeout(() => {
      router.replace('/auth/login')
    }, 1)
  }, [isLoaded, user])

  return { isLoaded }
}
