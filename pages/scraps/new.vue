<script setup lang="ts">
import { saveArticle } from '@/api/article'

const router = useRouter()
const form = ref({
  title: '',
  type: 'scrap',
})

const loading = ref(false)

async function start() {
  if (!form.value.title) {
    message.info('请输入标题')
    return
  }
  loading.value = true
  try {
    const { id } = await saveArticle(form.value)
    loading.value = false
    message.success('保存成功')
    router.push(`/scraps/${id}`)
    return true
  }
  catch (e) {
    loading.value = false
    return false
  }
}
</script>

<template>
  <div class="m-auto my-4 min-h-[85vh] w-[980px] flex flex-col items-center bg-white p-4">
    <h1 class="mt-20 text-[2em]">
      思绪碎片
    </h1>
    <div>记录这一瞬间的灵感源泉</div>
    <div class="i-carbon-3d-print-mesh mt-4 text-[2em]" />
    <a-textarea v-model:value="form.title" class="mt-6 w-[400px]" placeholder="请输入标题" />
    <a-button :loading="loading" type="primary" class="mt-5 w-[200px]" @click="start">
      开始
    </a-button>
  </div>
</template>
