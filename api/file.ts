import axios from 'axios'

export async function uploadFileToKv(file: Blob) {
  const data = new FormData()
  data.append('file', file)
  const { name } = await request({
    url: '/file/upload',
    method: 'POST',
    data,
  }) as { name: string }
  return `${baseURL}/file/${name}`
}

interface S3UploadInfo {
  endpoint: string
  key: string
  url: string
  bucket: string
}

export async function uploadFileToS3(file: Blob) {
  const { endpoint, key, url, bucket } = await request({
    url: '/file/s3',
  }) as S3UploadInfo

  await realUploadFileToS3(url, file)
  return `${endpoint}/${bucket}/${key}`
}

export async function realUploadFileToS3(url: string, file: Blob) {
  const config = {
    headers: {
      'Content-Type': null,
    },
  }
  return await axios.put(url, file, config)
}
