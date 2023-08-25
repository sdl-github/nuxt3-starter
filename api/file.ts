import { baseURL } from '@/utils/request'

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
