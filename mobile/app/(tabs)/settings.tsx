import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Image } from 'react-native'
import { colors } from '../../constants/Colors'
import { useClerk, useUser } from '@clerk/clerk-expo'
import Container from '../../components/container'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function Settings() {
  const { user } = useUser()
  const clerk = useClerk()

  return (
    <Container justifyContent="flex-start" style={{ paddingVertical: 16 }}>
      <View style={styles.userProfileCard}>
        <Image
          style={styles.userProfileCard__image}
          source={{ uri: user?.imageUrl }}
        />
        <View style={styles.userProfileCard__body}>
          <Text style={styles.userProfileCard__name}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.userProfileCard__email}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />

      <Pressable onPress={() => router.push('/settings/personalInfo')}>
        <View style={styles.link}>
          <Text
            style={{ fontFamily: 'Avenir', fontSize: 20, fontWeight: '600' }}
          >
            Personal Info
          </Text>
          <Ionicons name="person" size={24} />
        </View>
      </Pressable>

      <Pressable onPress={() => clerk.signOut()}>
        <View style={styles.link}>
          <Text
            style={{ fontFamily: 'Avenir', fontSize: 20, fontWeight: '600' }}
          >
            Sign out
          </Text>
          <Ionicons name="exit" size={24} />
        </View>
      </Pressable>
    </Container>
  )
}

const styles = StyleSheet.create({
  userProfileCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    position: 'relative',
  },

  userProfileCard__image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },

  userProfileCard__body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  userProfileCard__name: {
    fontSize: 24,
    fontWeight: '600',
  },

  userProfileCard__email: {
    fontSize: 16,
    opacity: 0.6,
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.black,
    opacity: 0.125,
    marginVertical: 16,
  },

  link: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: colors.black40,
    borderBottomWidth: 1,
    paddingVertical: 8,
    gap: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})
