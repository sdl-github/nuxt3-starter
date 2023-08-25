<script lang="ts" setup>
import type { IArticle } from '@/api/article'

defineProps({
  article: {
    type: Object as PropType<IArticle>,
    default: () => {},
  },
})
function formatTimeAgo(data: string) {
}
</script>

<template>
  <div class="m-auto mb-4 w-[100%] cursor-pointer rounded bg-#fff px-4 py-3">
    <div class="cursor-pointer text-[16px] font-bold leading-6">
      {{ article.title }}
    </div>
    <div class="mt-1 cursor-pointer text-[14px] leading-6">
      {{ article.desc }}
    </div>
    <div class="mt-1 flex items-center text-[12px]">
      <div class="flex cursor-pointer items-center color-[rgba(0,0,0,.45)]" />
      <div class="ml-2" />
    </div>
    <div class="flex items-center text-[12px]">
      <a-avatar size="small" :src="article.user?.avatar">
        {{ article.user?.nickname }}
      </a-avatar>
      <div class="ml-1 cursor-pointer color-[#515767]">
        {{ article.user?.nickname }}
      </div>
      <div class="ml-2 color-[#8a919f]">
        {{ article.created_at }}
      </div>
    </div>
  </div>
</template>
