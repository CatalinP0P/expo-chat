export default function compressAndResizeBase64Image(
  base64Data: string,
  targetWidth: number,
  targetHeight: number,
  callback: (compressedData: string) => void,
) {
  const img = new window.Image()
  img.src = `data:image/png;base64,${base64Data}`
  img.onload = function () {
    const canvas = window.document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight
    const ctx = canvas.getContext('2d')
    if (ctx == null) return
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
    const compressedBase64 = canvas.toDataURL('image/jpeg')
    const compressedData = compressedBase64.replace(
      /^data:image\/(png|jpeg);base64,/,
      '',
    )

    callback(compressedData)
  }
}
