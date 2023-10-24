<script setup lang="ts">
import { aiSummary, queryArticleDetail } from '@/api/article'
import '@/components/MdEditor/theme/smart-blue.css'
import MdViewer from '@/components/MdEditor/MdViewer.vue'

definePageMeta({
  keepalive: true,
})

const route = useRoute()
const userStore = useUserStore()
const articleId = computed(() => route.params.id as string)
const forceUpdate = ref(false)

const { data, error, refresh } = useAsyncData(`queryArticleDetail/${articleId.value}`, () => queryArticleDetail(articleId.value))

const { data: summary, refresh: refreshSummary, pending } = useLazyAsyncData(`aiSummary/${articleId.value}`, () => aiSummary(articleId.value, forceUpdate.value))

const isAuthor = computed(() => data.value?.userId === userStore.user?.id)

async function handleReFresh() {
  forceUpdate.value = true
  await refreshSummary()
  forceUpdate.value = false
}
</script>

<template>
  <div class="m-auto my-4 min-h-[100vh] w-[980px] rounded bg-white p-6">
    <template v-if="!data">
      <a-skeleton active class="p-4" />
    </template>
    <template v-else>
      <div class="mt-5 w-[100%] flex flex-col items-center">
        <div v-if="data.icon" class="h-[92px] w-[92px] flex items-center justify-center rounded bg-[#f1f5f9]">
          <span class="text-[3em]">{{ data.icon }}</span>
        </div>
        <h1 class="mb-2 text-[600px] text-1.5rem color-#252933">
          {{ data.title }}
          <nuxt-link v-if="isAuthor" :to="`/article/edit?id=${data.id}`">
            <span class="ml-2 text-12px color-#1677ff">编辑</span>
          </nuxt-link>
        </h1>
      </div>

      <div class="my-5 mt-15 h-35px flex">
        <div class="h-full w-50px">
          <a-avatar :size="35" :src="data.user?.avatar">
            {{ data.user?.nickname || data.user?.username }}
          </a-avatar>
        </div>
        <div class="ml-1 h-full flex flex-col justify-between">
          <div class="font-bold color-[#515767]">
            {{ data.user?.nickname || data.user?.username }}
          </div>
          <div class="flex items-center text-12px">
            <div class="color-[#8a919f]">
              创建与{{ data.created_at }}
            </div>
            <div v-if="data.updated_at" class="ml-4 flex color-[#8a919f]">
              <div class="i-carbon-edit" />
              <div class="ml-1">
                {{ data.updated_at }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-4 flex">
        <template v-for="tag in data.tags" :key="tag.tagId">
          <div class="hover:bg-[#f1f5f9]-200 ml-2 rounded-full bg-[#f1f5f9] p-1 px-4 text-[0.8em] text-[#8a919f] transition-all">
            {{ tag.tagName }}
          </div>
        </template>
      </div>
      <div class="mb-4 border border-slate-200 rounded-[7px] p-4 transition-all space-y-2 dark:border-neutral-800">
        <ClientOnly fallback-tag="span">
          <template v-if="pending">
            <a-skeleton />
          </template>
          <template v-else>
            <div>
              <div class="flex items-center">
                <div class="i-carbon-chemistry" />
                <div class="ml-1">
                  AI生成的摘要
                </div>
                <div class="i-carbon-rotate-360 ml-2 cursor-pointer" @click="handleReFresh" />
              </div>
              <div class="mt-1 text-[12px]">
                {{ summary }}
              </div>
            </div>
          </template>
          <template #fallback>
            <a-skeleton />
          </template>
        </ClientOnly>
      </div>
      <MdViewer :value="data.content_markdown" />
    </template>
  </div>
</template>
