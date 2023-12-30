import { useSignIn } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '../../constants/Colors'
import CustomButton from '../../components/customButton'
import GradientContainer from '../../components/gradientContainer'

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      })

      await setActive({ session: completeSignIn.createdSessionId })
      router.replace('/(tabs)/')

      //eslint-disable-next-line
    } catch (err: any) {
      alert('Error')
    }
  }
  return (
    <GradientContainer>
      <View style={styles.form__cotainer}>
        <Text style={styles.form__title}>Login</Text>
        <View style={styles.form__body}>
          <TextInput
            style={styles.form__input}
            placeholderTextColor={colors.white80}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />

          <TextInput
            style={styles.form__input}
            placeholderTextColor={colors.white80}
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <CustomButton onPress={onSignInPress} style={{ marginTop: 8 }}>
            LOGIN
          </CustomButton>
          <View style={styles.link__container}>
            <Text style={styles.link__text}>No Account?</Text>
            <Link style={styles.link__link} href={'/auth/register'}>
              Create one
            </Link>
          </View>
        </View>
      </View>
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  form__cotainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 32,
  },

  form__title: {
    fontSize: 32,
    transform: 'uppercase',
    fontWeight: '700',
    color: colors.white,
  },

  form__body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: '80%',
  },

  form__input: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    color: colors.white,
    textShadowColor: colors.white,
  },

  link__container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  link__text: { fontFamily: 'Avenir', fontSize: 16, color: colors.white },

  link__link: {
    fontFamily: 'Avenir',
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
})
