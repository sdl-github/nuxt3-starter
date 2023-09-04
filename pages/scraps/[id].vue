<script setup lang="ts">
import useSWRV from 'swrv'
import { queryArticleDetail } from '@/api/article'
import '@/components/MdEditor/theme/smart-blue.css'
import { type ISaveComment, createComment, deleteComment } from '@/api/comment'

const route = useRoute()
const userStore = useUserStore()

const user = computed(() => userStore.user)
const articleId = computed(() => route.params.id as string)
const saveLoading = ref(false)

const { data, error, mutate } = useSWRV(`queryArticleDetail/${articleId.value}`, () => queryArticleDetail(articleId.value))

const isAuthor = computed(() => data.value?.userId === userStore.user?.id)

const timeAgo = computed(() => data.value && useTimeAgo(new Date(data.value.created_at)).value)

const commentForm = ref<ISaveComment>({
  id: '',
  content_html: '',
  content_markdown: '',
})

async function handleSaveComment() {
  if (!commentForm.value.content_markdown) {
    message.info('请输入内容')
    return
  }
  const html = document.querySelector('.markdown-body')
  const textContent = html?.outerHTML
  commentForm.value.content_html = textContent
  commentForm.value.postId = articleId.value
  saveLoading.value = true
  const loading = message.loading('加载中', 0)
  try {
    await createComment(commentForm.value)
    await mutate()
    clearForm()
    saveLoading.value = false
    loading()
  }
  catch (e) {
    loading()
    saveLoading.value = false
  }
}

function clearForm() {
  commentForm.value.content_html = ''
  commentForm.value.content_markdown = ''
}

function handleDel(id: string) {
  Modal.confirm({
    title: '确认删除吗?',
    okText: '确认',
    cancelText: '取消',
    async onOk() {
      const loading = message.loading('加载中', 0)
      try {
        await deleteComment(id)
        await mutate()
        message.success('操作成功')
        loading()
      }
      catch (e) {
        loading()
      }
    },
    onCancel() {
    },
  })
}
</script>

<template>
  <div class="m-auto my-4 min-h-[100vh] w-[980px]">
    <template v-if="!data">
      <a-skeleton active class="p-4" />
    </template>
    <template v-else>
      <div class="my-5 w-[100%] flex items-center">
        <div v-if="data.icon" class="h-[92px] w-[92px] flex items-center justify-center rounded bg-[#f1f5f9]">
          <span class="text-[3em]">{{ data.icon }}</span>
        </div>
        <h1 class="mb-2 text-[600px] text-1.5rem color-#252933">
          {{ data.title }}
        </h1>
      </div>

      <template v-if="Array.isArray(data.comments) && !data.comments.length">
        <div class="mt-6 rounded bg-white p-4">
          快写点东西
        </div>
      </template>
      <template v-for="comment in data.comments" :key="comment.id">
        <div class="mt-6 rounded bg-white p-4">
          <div class="h-35px flex items-center justify-between">
            <div class="flex">
              <div class="h-full w-50px">
                <a-avatar :size="35" :src="comment.user?.avatar">
                  {{ comment.user?.nickname || comment.user?.username }}
                </a-avatar>
              </div>
              <div class="ml-1 h-full flex flex-col justify-between">
                <div class="font-bold color-[#515767]">
                  {{ comment.user?.nickname || comment.user?.username }}
                </div>
                <div class="flex items-center">
                  <div class="color-[#8a919f]">
                    {{ timeAgo }}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <a-dropdown>
                <a @click.prevent>
                  <div class="i-carbon-chevron-down" />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <div class="flex items-center">
                        <div class="i-carbon-view-off-filled" @click="handleHidden(comment.id)" />
                        <a class="ml-2">隐藏</a>
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div class="flex items-center">
                        <div class="i-carbon-edit" />
                        <a class="ml-2">编辑</a>
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div class="flex items-center" @click="handleDel(comment.id)">
                        <div class="i-carbon-trash-can" />
                        <a class="ml-2">删除</a>
                      </div>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>

          <div class="mt-2 min-h-[50px]" v-html="comment.content_html" />
        </div>
      </template>

      <div class="mt-6 rounded bg-white p-4">
        <div class="flex">
          <div class="w-50px">
            <a-avatar :size="35" :src=" user?.avatar">
              {{ user?.nickname || user?.username }}
            </a-avatar>
          </div>
          <div class="max-h-[600px] min-h-[200px] w-100%">
            <MdEditor v-model:content="commentForm.content_markdown" class="h-[100%] w-100%" />
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <a-button :loading="saveLoading" type="primary" @click="handleSaveComment">
            保存
          </a-button>
        </div>
      </div>
    </template>
  </div>
</template>
