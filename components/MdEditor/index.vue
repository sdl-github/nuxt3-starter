<script setup lang="ts">
import { Editor } from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import { plugins } from './plugins'
import '@/components/MdEditor/theme/smart-blue.css'
import { uploadFileToS3 } from '@/api/file'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['update:content'])

function handleChange(value: string) {
  emits('update:content', value)
}

async function uploadImages(files: File[]) {
  const list = []
  for (const file of files) {
    const close = message.loading('上传中')
    try {
      const url = await uploadFileToS3(file)
      if (!url)
        throw new Error('未知错误')

      close()
      message.success(`${file.name}上传成功`)
      list.push({ url: encodeURI(url) })
    }
    catch (e) {
      close()
      console.log(e)
      message.error(`${file.name}上传出错，请重试`)
    }
  }
  return list
}
</script>

<template>
  <div class="">
    <Editor
      class="h-full"
      :locale="zhHans"
      :plugins="plugins"
      :value="content"
      :upload-images="uploadImages"
      @change="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-card-body) {
  height: 100%;
  padding: 0px !important;
}
:deep(.bytemd) {
  height: 100%;
}
</style>
