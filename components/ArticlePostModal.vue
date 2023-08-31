<script lang="ts">
import useSWRV from 'swrv'
import { queryTagPage } from '@/api/tag'

const open = ref(false)
export default defineComponent({
  emits: ['ok'],
  setup(props, { emit }) {
    const formRef = ref()
    const loading = ref(false)
    const { setOpen } = useModal()
    const router = useRouter()
    const rules = {}
    const form = ref({
      tagNames: [],
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
      emit('ok', unref(form))
      setOpen(false)
    }

    function handleSearch(val: string) {
      searchTagParams.value.searchKeyWord = val
      debounceSearchTag()
    }

    return {
      setOpen,
      ok,
      handleSearch,
      loading,
      router,
      open,
      formRef,
      rules,
      form,
      tagOptions,
      searchTagData,
    }
  },
})

export function useModal() {
  return {
    setOpen(show: boolean) {
      open.value = show
    },
  }
}
</script>

<template>
  <a-modal
    title="文章设置" ok-text="确定" cancel-text="取消" :closable="false" :open="open" :mask-closable="false" :mask="false"
    width="400px" @cancel="setOpen(false)" @ok="ok"
  >
    <div class="mt-4">
      <a-form ref="formRef" layout="vertical" :model="form" :rules="rules">
        <a-form-item name="emoji">
          <EmojiSelectModal v-model:icon="form.icon" />
        </a-form-item>
        <a-form-item name="username" label="标签">
          <a-select
            v-model:value="form.tagNames"
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
