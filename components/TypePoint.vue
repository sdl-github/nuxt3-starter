<script setup lang="ts">
import type { IArticle } from '~/api/article'
import { deleteArticle } from '@/api/article'

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
const userStore = useUserStore()

const user = computed(() => userStore.user)

function handleDel(id: string) {
  Modal.confirm({
    title: '确认删除吗?',
    okText: '确认',
    cancelText: '取消',
    async onOk() {
      const loading = message.loading('加载中', 0)
      try {
        await deleteArticle(id)
        message.success('操作成功')
        loading()
      }
      catch (e) {
        loading()
      }
    },
    onCancel() {
    },
  })
}
</script>

<template>
  <div class="mb-2 w-full flex items-center justify-between">
    <div v-if="article.type" class="flex items-center">
      <div class="h-[6px] w-[6px] rounded" :style="`background:${color}`" />
      <div class="ml-1 text-[.75rem] text-[#a1a1a8]">
        {{ types[article.type] }}
      </div>
      <div v-if="article.is_pinned" class="ml-2 flex items-center text-[#a1a1a8]">
        <div class="i-carbon-up-to-top" />
        <div class="ml-1 text-[.7rem]">
          置顶
        </div>
      </div>
    </div>
    <div v-if="article.user.userId === user?.id" class="hidden group-hover:flex">
      <a-dropdown>
        <a @click.prevent>
          <div class="i-carbon-chevron-down" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <div class="flex items-center" @click.stop="handleDel(article.id)">
                <div class="i-carbon-trash-can" />
                <a class="ml-2">删除</a>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
