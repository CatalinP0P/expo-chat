import React, { useEffect, useState } from 'react'
import Container from '../../components/container'
import { Pressable, StyleSheet, Image, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { colors } from '../../constants/Colors'
import { useAuth, useUser } from '@clerk/clerk-expo'
import useAuthorizedPage from '../../hooks/useAuthorizedPage'
import CustomButton from '../../components/customButton'
import { router } from 'expo-router'
import { getAuthorizedApi } from '../../utils/api'
import * as ImagePicker from 'expo-image-picker'
import { encodeImageToBase64 } from '../../utils/encodeImageToBase64'
import { getUrlFromBase64Image } from '../../utils/getUrlFromBase64Image'

export default function PersonalInfo() {
  useAuthorizedPage()
  const { isLoaded, user } = useUser()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const { getToken } = useAuth()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const selectedImageURI = result.assets[0].uri
      const base64 = await encodeImageToBase64(selectedImageURI)

      setImageUrl(getUrlFromBase64Image(base64 as string))
    }
  }

  useEffect(() => {
    if (!isLoaded) return
    setImageUrl(user?.imageUrl as string)
    setNewFirstName(user?.firstName as string)
    setNewLastName(user?.lastName as string)
  }, [isLoaded])

  const handleSave = async () => {
    try {
      const token = await getToken()
      const api = getAuthorizedApi(token as string)

      if (user?.imageUrl != imageUrl) {
        await api.post('/user/update/image', {
          imageUrl: imageUrl.split(';')[1],
        })
      }

      const body = { firstName: newFirstName, lastName: newLastName }
      await api.post('/user/update', body)

      router.push('/settings')
    } catch (err) {
      router.push('/settings')
      alert(JSON.stringify(err))
      console.log('ERROR ON SAVING', err)
    }
  }

  return (
    <Container
      style={{ alignItems: 'center', paddingTop: 24 }}
      justifyContent="flex-start"
    >
      <Pressable onPress={pickImage} style={styles.profile__image__container}>
        <Image style={styles.profile__image} source={{ uri: imageUrl }} />
      </Pressable>
      <View style={styles.container}>
        <View style={styles.input__container}>
          <Text style={styles.input__text}>First Name</Text>
          <TextInput
            style={styles.input__input}
            placeholder="First Name"
            value={newFirstName}
            onChangeText={(text) => setNewFirstName(text)}
          />
        </View>

        <View style={styles.input__container}>
          <Text style={styles.input__text}>Last Name</Text>
          <TextInput
            style={styles.input__input}
            placeholder="Last Name"
            value={newLastName}
            onChangeText={(text) => setNewLastName(text)}
          />
        </View>

        <View style={styles.buttons__row}>
          <Pressable
            onPress={() => router.push('/settings')}
            style={{
              flex: 1,
              backgroundColor: colors.white,
              paddingHorizontal: 12,
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 18, color: colors.primary }}>Cancel</Text>
          </Pressable>
          <CustomButton onPress={handleSave} style={{ flex: 1 }}>
            Save
          </CustomButton>
        </View>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  profile__image__container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: 32,
    paddingTop: 16,
  },

  profile__image: {
    width: 144,
    height: 144,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.black20,
  },

  container: {
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  input__container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },

  input__text: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.black60,
  },

  input__input: {
    borderWidth: 1,
    borderColor: colors.black20,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 18,
  },

  buttons__row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    paddingTop: 24,
  },
})
