<script setup lang="ts">
import type { IArticlePageParams } from 'api/article'
import useSWRV from 'swrv'
import { queryArticlePage } from '@/api/article'

const params = reactive<IArticlePageParams>({
  pageNo: 1,
  pageSize: 10,
})

const { data, error, mutate } = useSWRV('queryArticlePage', () => queryArticlePage(params))

const loading = computed(() => !data.value?.rows)
</script>

<template>
  <div class="m-auto min-h-[100vh] w-[980px] rounded py-6">
    <div class="w-[980px] flex justify-between">
      <div class="w-[720px]">
        <template v-if="loading">
          <a-skeleton active />
        </template>
        <template v-else>
          <ArticleItem v-for="article in data?.rows" :key="article.id" :article="article" />
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
