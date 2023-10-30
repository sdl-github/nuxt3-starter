<script setup lang="ts">
import InfiniteLoading from 'v3-infinite-loading'
import type { IArticle, IArticlePageParams } from '@/api/article'
import { queryArticlePage } from '@/api/article'

definePageMeta({
  keepalive: true,
  scrollToTop: true,
})

const params = reactive<IArticlePageParams>({
  pageNo: 0,
  pageSize: 10,
})

const hasNext = ref(true)
const userStore = useUserStore()
const data = ref<IArticle[]>([])

await loadMoreData()

async function loadMoreData($state?: any) {
  if (!hasNext.value) {
    $state && $state.complete()
    return
  }
  params.pageNo = params.pageNo + 1
  try {
    const { hasNextPage, rows } = await queryArticlePage(params)
    data.value?.push(...rows)
    $state && $state.loaded()
    hasNext.value = !!hasNextPage
    if (!hasNextPage)
      $state && $state.complete()
  }
  catch (e) {
    $state && $state.error()
  }
}

function handleFastPostOk() {
  data.value = []
  params.pageNo = 0
  loadMoreData()
}
</script>

<template>
  <div class="m-auto min-h-[100vh] w-[980px] rounded py-6">
    <div class="w-[980px] flex justify-between">
      <div class="w-[720px] cursor-pointer">
        <ArticleItem v-for="article in data" :key="article.id" :article="article" />
        <InfiniteLoading :firstload="true" @infinite="loadMoreData">
          <template #spinner>
            <div class="w-full flex justify-center py-4">
              <a-spin />
            </div>
          </template>
          <template #complete>
            <div class="w-full flex justify-center py-4 text-12px color-[#515767]">
              <span>一点也没有了</span>
            </div>
          </template>
        </InfiniteLoading>
      </div>
      <div class="w-[250px]">
        <ClientOnly fallback-tag="span">
          <FastPost v-if="userStore.user?.id" @ok="handleFastPostOk" />
          <template #fallback>
            <!-- this will be rendered on server side -->
            <a-spin class="ml-4" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
