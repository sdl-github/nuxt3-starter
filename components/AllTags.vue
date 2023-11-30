<script setup lang="ts">
import { queryAllTags } from '~/api/tag'
import { getRandomColor } from '~/utils/utils'

const { data, error, refresh } = useAsyncData('queryAllTags', () => queryAllTags())
</script>

<template>
  <div class="w-[250px] rounded-[7px] bg-white p-2 p-4">
    <a-tag v-for="(tag, index) in data" :key="index" :bordered="false" :color="getRandomColor(tag.name)" class="m-1 cursor-pointer">
      {{ tag.name }}({{ tag.usage_count }})
    </a-tag>
  </div>
</template>
