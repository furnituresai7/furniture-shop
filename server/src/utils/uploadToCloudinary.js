import cloudinary from '../config/cloudinary.js'

// Uploads a Buffer (from multer memoryStorage) to Cloudinary using a stream,
// since Cloudinary's SDK expects either a file path or a stream, not a raw Buffer.
export function uploadBufferToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }
        resolve(result)
      },
    )
    stream.end(buffer)
  })
}

export function deleteFromCloudinary(publicId) {
  return cloudinary.uploader.destroy(publicId)
}