<script setup lang="ts">
import { queryAllTags } from '~/api/tag'

const { data, error, refresh } = useAsyncData('queryAllTags', () => queryAllTags())
const colors = ['processing', 'success', 'error', 'warning', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
function getRandomColor(seed: string) {
  function hashCode(str: string) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = Math.imul(31, hash) + str.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }
    return Math.abs(hash)
  }
  const randomIndex = hashCode(seed) % colors.length
  return colors[randomIndex]
}
</script>

<template>
  <div class="w-[250px] rounded-[7px] bg-white p-2 p-4">
    <a-tag v-for="(tag, index) in data" :key="index" :bordered="false" :color="getRandomColor(tag.name)" class="m-1 cursor-pointer">
      {{ tag.name }}({{ tag.usage_count }})
    </a-tag>
  </div>
</template>
