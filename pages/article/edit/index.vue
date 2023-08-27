<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
</script>

<template>
  <div class="h-[100vh]">
    <div class="h-[64px] flex items-center px-6">
      <a-input placeholder="请输入标题" class="h-64px text-[1.5em] font-bold" :bordered="false" />
      <div>
        <a-button type="primary">
          发布
        </a-button>
      </div>
    </div>
    <MdEditor class="h-[calc(100vh-64px)]" />
  </div>
</template>
