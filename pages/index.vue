<script setup lang="ts">
import type { IArticlePageParams } from 'api/article'
import useSWRV from 'swrv'
import { queryArticlePage } from '@/api/article'

const params = reactive<IArticlePageParams>({
  pageNo: 1,
  pageSize: 10,
})

const { data, error, mutate } = useSWRV(`queryArticlePage/page/${params.pageNo}`, () => queryArticlePage(params))

const loading = computed(() => !data.value?.rows)
const spinning = ref(false)

async function handleUpdateCurrent() {
  spinning.value = true
  backToTop()
  await mutate()
  spinning.value = false
}

function backToTop() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 0) {
    window.requestAnimationFrame(backToTop)
    window.scrollTo(0, scrollTop - scrollTop / 8)
  }
}
</script>

<template>
  <div class="m-auto min-h-[100vh] w-[980px] rounded py-6">
    <div class="w-[980px] flex justify-between">
      <div class="w-[720px]">
        <template v-if="loading">
          <a-skeleton active />
        </template>
        <template v-else>
          <a-spin tip="Loading..." :spinning="spinning">
            <ArticleItem v-for="article in data?.rows" :key="article.id" :article="article" />
            <a-pagination v-model:current="params.pageNo" size="default" :total="data?.total" show-less-items @update:current="handleUpdateCurrent" />
          </a-spin>
        </template>
      </div>
      <div class="w-[250px]">
        <div class="rounded bg-white p-2">
          <div class="p-1">
            TOP TODO
          </div>
          <a-skeleton />
        </div>
      </div>
    </div>
  </div>
</template>
