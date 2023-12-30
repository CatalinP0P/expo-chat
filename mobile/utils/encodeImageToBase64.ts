import * as FileSystem from 'expo-file-system'

export const encodeImageToBase64 = async (imageUri: string) => {
  try {
    const response = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    })

    return response
  } catch (error) {
    console.error('Error encoding image to base64:', error)
    return null
  }
}
