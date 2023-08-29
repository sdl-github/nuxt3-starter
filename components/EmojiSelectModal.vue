<script setup lang="ts">
import { Tippy } from 'vue-tippy'

// @ts-expect-error
import { EmojiIndex, Picker } from 'emoji-mart-vue-fast/src'
import data from 'emoji-mart-vue-fast/data/all.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['update:icon'])
const emojiIndex = new EmojiIndex(data)

onMounted(() => {
  if (!props.icon) {
    const icon = generateDefaultIcon()
    emits('update:icon', icon)
  }
})

function generateDefaultIcon() {
  const emojiDataArr = Object.keys(emojiIndex._nativeEmojis)
  const icon = emojiDataArr[Math.floor(Math.random() * emojiDataArr.length)]
  return icon
}

function handleSelectEmoji(data: { native: string }) {
  emits('update:icon', data.native)
}
</script>

<template>
  <Tippy theme="white" :arrow="false" :interactive="true" placement="bottom" trigger="click">
    <div class="flex cursor-pointer items-center border rounded">
      <div class="h-[72px] w-[72px] flex items-center justify-center rounded bg-[#f1f5f9]">
        <span class="text-[3em]">{{ icon }}</span>
      </div>
      <div class="mx-4 color-#000000d1">
        选择emoji
      </div>
    </div>
    <template #content>
      <Picker :data="emojiIndex" title="Pick your emoji…" emoji="point_up" @select="handleSelectEmoji" />
    </template>
  </Tippy>
</template>

<style lang="scss">
.tippy-box[data-theme~='white'] {
  background-color: white !important;
  border-radius: 4px !important;
  border-width: 1px !important;
  box-shadow: 0 12px 20px rgba(0, 0, 0, .16);

  .tippy-content {
    padding: 0 !important;
  }
}
.emoji-mart {
  border: none;
}
</style>
