<script setup lang="ts">
import { Editor } from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import { plugins } from './plugins'
import '@/components/MdEditor/theme/smart-blue.css'

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
</script>

<template>
  <div class="">
    <Editor
      class="h-full"
      :locale="zhHans"
      :plugins="plugins"
      :value="content"
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
