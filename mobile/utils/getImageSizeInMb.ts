export default function getImageSizeInMB(base64String: string): string {
  const binaryData = atob(base64String) // Decode base64 to binary
  const imageSizeInBytes = binaryData.length
  const imageSizeInMB = (imageSizeInBytes / (1024 * 1024)).toFixed(2) // Convert to MB with 2 decimal places

  return `${imageSizeInMB} MB`
}
