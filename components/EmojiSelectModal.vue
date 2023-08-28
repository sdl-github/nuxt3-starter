<script setup lang="ts">
import { Tippy } from 'vue-tippy'

import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'
import i18n from '@emoji-mart/data/i18n/zh.json'

let picker: Picker | null = null

const emojiPickerRef = ref({} as HTMLElement)
const show = ref(false)
onMounted(() => {
  console.log('onMounted')
  const pickerOptions = {
    onEmojiSelect,
    data,
    i18n,
    parent: emojiPickerRef.value,
  }
  picker = new Picker(pickerOptions)
})

function onEmojiSelect(e: any) {
  console.log(e)
}
function handleOpenEmojiPicker() {
}
function cancel() {
}
function handleClickOutSide() {
  show.value = false
}
function onMount() {
  console.log('onMount')
}
</script>

<template>
  <Tippy :interactive="true" placement="bottom" trigger="click" :hide-on-click="false" @on-show="onMount" @click-outside="handleClickOutSide">
    <a-button>emoji!</a-button>
    <template #content>
      <div id="emoji-picker" ref="emojiPickerRef" />
    </template>
  </Tippy>
</template>
