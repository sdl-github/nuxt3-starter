<script setup lang="ts">
import useSWRV from 'swrv'
import { queryArticleDetail } from '@/api/article'
import '@/components/MdEditor/theme/smart-blue.css'

const route = useRoute()
const userStore = useUserStore()
const articleId = computed(() => route.params.id as string)

const { data, error, mutate } = useSWRV(`queryArticleDetail/${articleId.value}`, () => queryArticleDetail(articleId.value))

const isAuthor = computed(() => data.value?.userId === userStore.user?.id)
</script>

<template>
  <div class="m-auto my-4 min-h-[100vh] w-[980px] rounded bg-white p-6">
    <template v-if="!data">
      <a-skeleton active class="p-4" />
    </template>
    <template v-else>
      <h1 class="mb-2 text-[600px] text-1.5rem color-#252933">
        {{ data.title }}
        <nuxt-link v-if="isAuthor" :to="`/article/edit?id=${data.id}`">
          <span class="ml-2 text-12px color-#1677ff">编辑</span>
        </nuxt-link>
      </h1>
      <div class="my-5 h-35px flex">
        <div class="h-full w-50px">
          <a-avatar :size="35" :src="data.user?.avatar">
            {{ data.user?.nickname || data.user?.username }}
          </a-avatar>
        </div>
        <div class="ml-1 h-full flex flex-col justify-between">
          <div class="font-bold color-[#515767]">
            {{ data.user?.nickname || data.user?.username }}
          </div>
          <div class="flex items-center">
            <div class="color-[#8a919f]">
              {{ data.created_at }}
            </div>
          </div>
        </div>
      </div>
      <div v-html="data.content_html" />
    </template>
  </div>
</template>
