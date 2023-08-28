<script setup lang="ts">
import { Tippy } from 'vue-tippy'
import { EmojiIndex, Picker } from 'emoji-mart-vue-fast/src'
import data from 'emoji-mart-vue-fast/data/all.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'

const emojiIndex = new EmojiIndex(data)

const emoji = ref<string>('')
console.log(emojiIndex)

function handleSelectEmoji(data: { native: string }) {
  emoji.value = data.native
}
</script>

<template>
  <Tippy :interactive="true" placement="bottom" trigger="click">
    <div>
      emoji {{ emoji }}
    </div>
    <template #content>
      <Picker
        :data="emojiIndex"
        title="Pick your emoji…"
        emoji="point_up"
        @select="handleSelectEmoji"
      />
    </template>
  </Tippy>
</template>
