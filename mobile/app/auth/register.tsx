import { useSignUp } from '@clerk/clerk-expo'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { TextInput, View } from 'react-native'
import { colors } from '../../constants/Colors'
import CustomButton from '../../components/customButton'
import GradientContainer from '../../components/gradientContainer'

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp()

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      })

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // change the UI to our pending section.
      setPendingVerification(true)
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      await setActive({ session: completeSignUp.createdSessionId })
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2))
    }
  }
  return (
    <GradientContainer>
      {!pendingVerification && (
        <View style={styles.form__container}>
          <Text style={styles.form__title}>Register Account</Text>
          <View style={styles.form__body}>
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholderTextColor={colors.white80}
              placeholder="First Name..."
              style={styles.form__input}
              onChangeText={(firstName) => setFirstName(firstName)}
            />
            <TextInput
              style={styles.form__input}
              placeholderTextColor={colors.white80}
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
            />

            <TextInput
              style={styles.form__input}
              placeholderTextColor={colors.white80}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />

            <TextInput
              style={styles.form__input}
              placeholderTextColor={colors.white80}
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <CustomButton onPress={onSignUpPress} style={{ marginTop: 8 }}>
              Create Account
            </CustomButton>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View style={styles.form__container}>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
            style={styles.form__input}
          />
          <CustomButton onPress={onPressVerify}>Verify Email</CustomButton>
        </View>
      )}
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  form__container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 32,
  },

  form__title: {
    fontSize: 32,
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
  },

  link__container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  link__text: { fontFamily: 'Avenir', fontSize: 16 },

  link__link: {
    fontFamily: 'Avenir',
    fontSize: 16,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
})
