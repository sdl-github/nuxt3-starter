<script lang="ts" setup>
import { type IArticle } from '@/api/article'
import { deleteArticle } from '@/api/article'

defineProps({
  article: {
    type: Object as PropType<IArticle>,
    default: () => {},
  },
  isAuthor: {
    type: Boolean,
    default: () => false,
  },
})
const emits = defineEmits(['refresh'])

async function handleDel(id: string) {
  Modal.confirm({
    title: '确认删除吗?',
    okText: '确认',
    cancelText: '取消',
    async onOk() {
      const loading = message.loading('加载中', 0)
      try {
        loading()
        await deleteArticle(id)
        emits('refresh')
        message.success('操作成功')
        return true
      }
      catch (e) {
        loading()
        return false
      }
    },
    onCancel() {
    },
  })
}
</script>

<template>
  <NuxtLink :to="`/article/${article.id}`">
    <div class="group m-auto mb-4 w-[100%] flex cursor-pointer justify-between rounded bg-#fff px-4 py-3">
      <div>
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
          <div class="ml-1 cursor-pointer color-[#515767] hover:color-[#1677ff]">
            <NuxtLink :to="`/user/${article.user.id}`">
              {{ article.user?.nickname }}
            </NuxtLink>
          </div>
          <div class="ml-2 color-[#8a919f]">
            {{ article.created_at }}
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div v-if="article.icon" class="h-[92px] w-[92px] flex items-center justify-center rounded bg-[#f1f5f9]">
          <span class="text-[3em]">{{ article.icon }}</span>
        </div>
        <div v-if="isAuthor" class="w-[92px] flex items-center justify-around rounded">
          <NuxtLink :to="`/article/edit?id=${article.id}`">
            <a-button shape="circle" class="flex items-center justify-center">
              <div class="i-carbon-edit" />
            </a-button>
          </NuxtLink>

          <a-button shape="circle" class="flex items-center justify-center">
            <div class="i-carbon-trash-can" @click="handleDel(article.id)" />
          </a-button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
</style>
