export default function compressBase64Image(
  base64Image: string,
  quality: number = 0.7,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = base64Image

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject('Unable to get 2D context')
        return
      }

      canvas.width = img.width
      canvas.height = img.height

      try {
        ctx.drawImage(img, 0, 0, img.width, img.height)
      } catch (error) {
        reject(`Error drawing image on canvas: ${error}`)
        return
      }

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject('Error creating image blob')
            return
          }

          const reader = new FileReader()
          reader.onloadend = () => {
            const compressedBase64 = reader.result as string
            resolve(compressedBase64)
          }

          reader.readAsDataURL(blob)
        },
        'image/jpeg',
        quality,
      )
    }

    img.onerror = () => {
      reject('Error loading image')
    }
  })
}
