<script lang="ts" setup>
import useSWRV from 'swrv'
import { queryTagPage } from '@/api/tag'

const emits = defineEmits(['ok'])
const open = ref(false)
const formRef = ref()
const loading = ref(false)
const router = useRouter()
const rules = {}
interface IForm { icon: string; tags: string[] }
const form = ref<IForm>({
  tags: [],
  icon: '',
})

const searchTagParams = ref({
  pageNo: 1,
  pageSize: 10,
  searchKeyWord: '',
})

const { data: searchTagData, error, mutate: mutateSearchTag } = useSWRV(() => searchTagParams.value.searchKeyWord && 'queryArticlePage',
  () => queryTagPage(searchTagParams.value))

const tagOptions = computed(() => {
  return searchTagData.value?.rows.map((item) => {
    const { name: value } = item
    return { value }
  })
})

const debounceSearchTag = useDebounceFn(() => {
  mutateSearchTag()
}, 500)

function ok() {
  emits('ok', unref(form))
}

function cancel() {
  open.value = false
}
function handleSearch(val: string) {
  searchTagParams.value.searchKeyWord = val
  debounceSearchTag()
}

function start(source: IForm) {
  const { icon, tags } = source
  form.value.icon = icon
  form.value.tags = tags
  open.value = true
}

defineExpose({
  start,
})
</script>

<template>
  <a-modal
    title="文章设置" ok-text="确定" cancel-text="取消" :closable="false" :open="open" :mask-closable="false" :mask="false"
    width="400px" @cancel="cancel" @ok="ok"
  >
    <div class="mt-4">
      <a-form ref="formRef" layout="vertical" :model="form" :rules="rules">
        <a-form-item name="emoji">
          <EmojiSelectModal v-model:icon="form.icon" />
        </a-form-item>
        <a-form-item name="username" label="标签">
          <a-select
            v-model:value="form.tags"
            mode="tags"
            placeholder="标签"
            allow-clear
            show-search
            :options="tagOptions"
            @search="handleSearch"
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
