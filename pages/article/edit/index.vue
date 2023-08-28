<script setup lang="ts">
import ArticlePostModal, { useModal } from '@/components/ArticlePostModal.vue'

definePageMeta({
  layout: 'empty',
})

const mdEditorRef = ref(null as any)

const { setOpen: setArticlePostModal } = useModal()

const title = ref('')

function handleOpenArticleModal() {
  const content = mdEditorRef.value.content
  // if (!title.value) {
  //   message.info('请输入标题')
  //   return
  // }
  // if (!content) {
  //   message.info('请输入内容')
  //   return
  // }
  setArticlePostModal(true)
}

function handleSaveOrPub() {
  const title = ref('')
  const content = mdEditorRef.value.content
  if (!title.value) {
    message.info('请输入标题')
    return
  }
  if (!content) {
    message.info('请输入内容')
    return
  }
  const data = {
    title: title.value,
    icon: '❤️',
    content,
    type: 'article',
  }
}
</script>

<template>
  <div class="h-[100vh]">
    <div class="h-[64px] flex items-center px-6">
      <a-input v-model:value="title" placeholder="请输入标题" class="h-64px text-[1.5em] font-bold" :bordered="false" />
      <div class="flex">
        <a-button type="primary" class="flex items-center" @click="handleOpenArticleModal">
          发布
        </a-button>
        <ArticlePostModal />
      </div>
    </div>
    <MdEditor ref="mdEditorRef" class="h-[calc(100vh-64px)]" />
  </div>
</template>
