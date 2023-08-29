<script lang="ts">
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
    function ok() {
      emit('ok', unref(form))
      setOpen(false)
    }
    return {
      setOpen,
      ok,
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
          <a-select v-model:value="form.tagNames" mode="tags" placeholder="标签" allow-clear />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
