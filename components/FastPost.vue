<script lang="ts" setup>
import { type ISaveArticle, queryArticleDetail, saveArticle, updateArticle } from '@/api/article'

const emits = defineEmits(['ok'])
const loading = ref(false)

const form = ref<ISaveArticle>({
  id: '',
  title: '',
  type: 'article',
  icon: '',
  desc: '',
  content_markdown: '',
  content_html: '',
})

async function handleSave() {
  if (!form.value.title) {
    message.info('请输入')
    return false
  }
  const loading = message.loading('保存中', 0)

  try {
    if (form.value.id) {
      await updateArticle(form.value)
    }
    else {
      const { id } = await saveArticle(form.value)
      form.value.id = id
    }
    emits('ok')
    loading()
    message.success('保存成功')
    return true
  }
  catch (e) {
    loading()
    return false
  }
}
</script>

<template>
  <div class="rounded bg-white p-2">
    <div class="p-1 font-bold text-[#737476]">
      快速发布
    </div>
    <a-textarea v-model:value="form.title" allow-clear :rows="4" />
    <div class="mt-2 w-full flex justify-between">
      <div />
      <a-button :loading="loading" type="primary" @click="handleSave">
        发布
      </a-button>
    </div>
  </div>
</template>
