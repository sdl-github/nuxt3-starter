<script setup lang="ts">
import { Editor } from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import { plugins } from './plugins'

const content = ref('')

function handleChange(value: string) {
  content.value = value
}
</script>

<template>
  <div>
    <Editor
      class="h-full"
      :locale="zhHans"
      :plugins="plugins"
      :value="content"
      @change="handleChange"
    />
  </div>
</template>
