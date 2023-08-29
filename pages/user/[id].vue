<script setup lang="ts">
import useSWRV from 'swrv'
import type { IArticlePageParams } from '@/api/article'
import { queryArticlePage } from '@/api/article'
import { queryUserInfoByUserId } from '@/api/user'

const route = useRoute()
const userStore = useUserStore()
const userId = computed(() => route.params.id as string)
const type = ref('article')

const params = reactive<IArticlePageParams>({
  pageNo: 1,
  pageSize: 10,
  userId: userId.value,
  type: type.value,
})

const { data: user, error, mutate } = useSWRV(`queryUserInfoByUserId/${userId}/page/${params.pageNo}`, () => queryUserInfoByUserId(userId.value))

const { data: articleList, mutate: mutateQueryArticlePage } = useSWRV(`queryArticlePage/${userId}`, () => queryArticlePage(params))

const isAuthor = computed(() => userId.value === userStore.user?.id)

const spinning = ref(false)

async function handleUpdateCurrent() {
  spinning.value = true
  backToTop()
  await mutateQueryArticlePage()
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
  <div class="w-[100%] bg-white">
    <div class="m-auto w-[980px]">
      <template v-if="!user">
        <a-skeleton active class="py-[3em]" />
      </template>
      <template v-else>
        <div class="rounded">
          <div class="flex py-[3em]">
            <div>
              <a-avatar :size="128" :src="user?.avatar" :alt="user?.nickname">
                {{ user?.nickname }}
              </a-avatar>
            </div>
            <div class="ml-10 flex flex-col justify-around">
              <div class="text-[2em] font-bold">
                {{ user?.nickname }}
              </div>
              <div>{{ user?.note }}</div>
              <div class="flex">
                <div class="i-carbon-logo-github cursor-pointer" />
                <div class="i-carbon-earth-southeast-asia-filled ml-2 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <a-tabs v-model:activeKey="type" @change="() => mutateQueryArticlePage()">
        <a-tab-pane key="article" tab="文章" />
        <a-tab-pane key="scrap" tab="碎片" />
      </a-tabs>
    </div>
  </div>
  <div class="m-auto w-[980px] py-4">
    <template v-if="!articleList">
      <a-skeleton active />
    </template>
    <template v-else>
      <a-spin tip="Loading..." :spinning="spinning">
        <ArticleItem v-for="article in articleList?.rows" :key="article.id" :is-author="isAuthor" :article="article" />
        <a-pagination v-model:current="params.pageNo" size="default" :total="articleList?.total" show-less-items @update:current="handleUpdateCurrent" @refresh="mutateQueryArticlePage" />
      </a-spin>
    </template>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-tabs-nav) {
  margin: 0;
}
</style>
