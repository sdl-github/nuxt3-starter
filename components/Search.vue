<script setup lang="ts">
import type { IArticle, IArticlePageParams } from '~/api/article'
import { queryArticlePage } from '~/api/article'

const isSearch = ref(false)
const loading = ref(false)
const open = ref(false)
const searchRef = ref()
const searchKeyWord = ref('')
const searchResult = ref<IArticle[]>([])

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k')
      open.value = true
  })
})

watch(open, () => {
  if (open.value) {
    nextTick(() => {
      searchRef.value && searchRef.value.focus()
    })
  }
})

const debouncedFn = useDebounceFn(async () => {
  loading.value = true
  await search()
  loading.value = false
}, 1000)

function handleInput(e: Event & {
  target: {
    value?: string | undefined
  }
}) {
  const value = e.target?.value
  searchResult.value = []

  if (!value) {
    isSearch.value = false
    setTimeout(() => {
      isSearch.value = false
      searchResult.value = []
    }, 1000)
    return
  }
  loading.value = true
  isSearch.value = true
  debouncedFn()
}

async function search() {
  const params: IArticlePageParams = {
    pageNo: 1,
    pageSize: 10,
    searchKeyWord: searchKeyWord.value,
  }
  const res = await queryArticlePage(params)
  searchResult.value = res.rows
}

function close() {
  open.value = false
}
</script>

<template>
  <div
    class="mr-2 flex cursor-pointer items-center rounded-[2em] bg-[#F2F5F4] px-4 py-2 font-bold text-[#737476]"
    @click="open = true"
  >
    <SvgIcon name="search" class="h-[1em] w-[1em]" />
    <div class="ml-1">
      搜索
    </div>
    <div class="ml-2">
      ⌘ K
    </div>
  </div>

  <a-modal
    :footer="false" :closable="false" :open="open" :mask-closable="true" :mask="true" width="800px"
    :mask-style="{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(243, 244, 246, 0.1)' }" @cancel="close"
  >
    <div>
      <a-input ref="searchRef" v-model:value="searchKeyWord" placeholder="请输入关键词" @input="handleInput" />
      <div v-if="loading" class="mt-6 w-full flex justify-center">
        <a-spin />
      </div>
      <div v-if="isSearch && !loading && !searchResult.length" class="mt-6 w-full flex justify-center">
        <a-result status="404" title="空空如也" />
      </div>
      <div v-if="searchResult.length" class="mt-6 max-h-[60vh] overflow-auto">
        <div class="mb-2 text-[#737476]">
          结果
        </div>
        <ArticleItem v-for="article in searchResult" :key="article.id" :article="article" :is-search="true" @click="close" />
      </div>
    </div>
  </a-modal>
</template>
