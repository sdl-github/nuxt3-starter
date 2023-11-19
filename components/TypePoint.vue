<script setup lang="ts">
import type { IArticle } from '~/api/article'

const props = defineProps({
  article: {
    type: Object as PropType<IArticle>,
    default: () => { },
  },
})
const types = {
  article: '文字',
  scrap: '碎片',
  say: '说说',
}
const colors = ['rgba(33,99,232,.75)', 'rgba(247,195,46,.75)']
const color = computed(() => props.article.type === 'article' ? colors[0] : colors[1])
</script>

<template>
  <div v-if="article.type" class="mb-2 flex items-center">
    <div class="h-[6px] w-[6px] rounded" :style="`background:${color}`" />
    <div class="ml-1 text-[.75rem] text-[#a1a1a8]">
      {{ types[article.type] }}
    </div>
  </div>
</template>
