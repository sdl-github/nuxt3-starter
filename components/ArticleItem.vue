<script lang="ts" setup>
import { type IArticle } from '@/api/article'
import { deleteArticle } from '@/api/article'

const props = defineProps({
  article: {
    type: Object as PropType<IArticle>,
    default: () => { },
  },
  isAuthor: {
    type: Boolean,
    default: () => false,
  },
})

const emits = defineEmits(['refresh'])

const timeAgo = useTimeAgo(new Date(props.article.created_at))

const toUrl = computed(() => props.article.type === 'article' ? `/article/${props.article.id}` : `/scraps/${props.article.id}`)
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
  <div>
    <NuxtLink :to="toUrl">
      <div class="group m-auto mb-4 w-[100%] flex cursor-pointer justify-between rounded bg-#fff px-4 py-3">
        <div class="mr-2">
          <div class="flex items-center">
            <div
              :class="`flex items-center rounded-full  p-0.5 px-2 text-sm  transition-all ${article.type === 'article' ? 'text-white bg-#807aff' : 'text-white bg-#1677ff'}`"
            >
              <div :class="`${article.type === 'article' ? 'i-carbon-document' : 'i-carbon-carbon'} text-[12px]`" />
              <div class="ml-1 text-[12px]">
                {{ article.type === 'article' ? '文章' : '碎片' }}
              </div>
            </div>
            <div class="mx-2 cursor-pointer text-[16px] font-bold leading-6">
              {{ article.title }}
            </div>
          </div>
          <div class="mt-2 cursor-pointer text-[14px] leading-6">
            {{ article.desc }}
          </div>
          <div class="mt-2 flex items-center">
            <div class="flex items-center text-[12px]">
              <a-avatar size="small" :src="article.user?.avatar">
                {{ article.user?.nickname }}
              </a-avatar>
              <div class="ml-1 cursor-pointer color-[#515767] hover:color-[#1677ff]">
                <NuxtLink :to="`/user/${article.user.userId}`">
                  {{ article.user?.nickname }}
                </NuxtLink>
              </div>
              <div class="ml-2 color-[#8a919f]">
                {{ timeAgo }}
              </div>
            </div>
            <div class="ml-4 flex">
              <div v-if="article.comments_count" class="flex items-center text-[#8a919f]">
                <div class="i-carbon-chat" />
                <div class="ml-1 text-[0.8em]">
                  {{ article.comments_count }}
                </div>
              </div>
              <template v-for="tag in article.tags" :key="tag.tagId">
                <div
                  class="hover:bg-[#f1f5f9]-200 ml-2 rounded-full bg-[#f1f5f9] p-1 px-4 text-[0.8em] text-[#8a919f] transition-all"
                >
                  {{ tag.tagName }}
                </div>
              </template>
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
  </div>
</template>

<style lang="scss" scoped></style>
