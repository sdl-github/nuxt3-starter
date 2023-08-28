<script lang="ts">
const open = ref(false)
export default defineComponent({
  setup() {
    const formRef = ref()
    const loading = ref(false)
    const { setOpen } = useModal()
    const router = useRouter()
    const rules = {}
    const form = ref({
      tagNames: [],
      desc: '',
    })
    return {
      setOpen,
      loading,
      router,
      open,
      formRef,
      rules,
      form,
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
  <a-modal title="文章设置" ok-text="确定" cancel-text="取消" :open="open" :mask="false" width="400px" @cancel="setOpen(false)">
    <div class="mt-4">
      <a-form ref="formRef" layout="vertical" :model="form" :rules="rules">
        <a-form-item name="username" label="标签">
          <EmojiSelectModal />
        </a-form-item>
        <a-form-item name="username" label="标签">
          <a-select v-model:value="form.tagNames" mode="tags" placeholder="标签" allow-clear />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
