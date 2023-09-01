<script setup lang="ts">
import ArticlePostModal from '@/components/ArticlePostModal.vue'
import type { ISaveArticle } from '@/api/article'
import { queryArticleDetail, saveArticle, updateArticle } from '@/api/article'

definePageMeta({
  layout: 'empty',
})

const articlePostModalRef = ref<any>()
const route = useRoute()
const router = useRouter()
const articleId = computed(() => route.query.id as string)
const loading = ref(false)
const form = ref<ISaveArticle>({
  id: '',
  title: '',
  type: 'article',
  icon: '',
  desc: '',
  content_markdown: '',
  content_html: '',
  tags: [],
})

const mdEditorRef = ref(null as any)

onMounted(async () => {
  if (articleId.value) {
    loading.value = true
    const { id, title, type, icon, desc, content_markdown } = await queryArticleDetail(articleId.value)
    form.value.id = id
    form.value.title = title
    form.value.type = type
    form.value.icon = icon
    form.value.desc = desc
    form.value.content_markdown = content_markdown

    loading.value = false
  }
})

async function handleOpenArticleModal() {
  if (!form.value.title) {
    message.info('请输入标题')
    return false
  }
  if (!form.value.content_markdown) {
    message.info('请输入内容')
    return false
  }
  const { icon, tags } = form.value
  articlePostModalRef.value.start({ icon, tags })
}

async function handleSaveArticle() {
  if (!form.value.title) {
    message.info('请输入标题')
    return false
  }
  if (!form.value.content_markdown) {
    message.info('请输入内容')
    return false
  }

  const html = document.querySelector('.markdown-body')
  const textContent = html?.textContent || ''
  const desc = textContent?.length >= 100 ? textContent?.substring(0, 100) : textContent?.substring(0, textContent.length)
  form.value.content_html = html?.outerHTML as string
  form.value.desc = desc

  const loading = message.loading('保存中', 0)

  try {
    if (form.value.id) {
      await updateArticle(form.value)
    }
    else {
      const { id } = await saveArticle(form.value)
      form.value.id = id
    }

    loading()
    message.success('保存成功')
    return true
  }
  catch (e) {
    loading()
    return false
  }
}

async function handlePublish(data: { icon: string; tags: string[] }) {
  const { icon, tags } = data
  form.value.icon = icon
  form.value.tags = tags
  await handleSaveArticle()
  router.push(`/article/${form.value.id}`)
}
</script>

<template>
  <div class="h-[100vh]">
    <template v-if="loading">
      <a-skeleton active class="p-4" />
    </template>
    <template v-else>
      <div class="h-[64px] flex items-center px-6">
        <a-input v-model:value="form.title" placeholder="请输入标题" class="h-64px text-[1.5em] font-bold" :bordered="false" />
        <div class="flex">
          <a-button type="primary" class="flex items-center" @click="handleOpenArticleModal">
            发布
          </a-button>
          <!-- <a-button type="primary" class="ml-2 flex items-center" @click="handleSaveArticle">
            保存
          </a-button> -->
          <ArticlePostModal ref="articlePostModalRef" @ok="handlePublish" />
        </div>
      </div>
      <MdEditor ref="mdEditorRef" v-model:content="form.content_markdown" class="h-[calc(100vh-64px)]" />
    </template>
  </div>
</template>
