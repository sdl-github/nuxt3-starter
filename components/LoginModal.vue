<script lang="ts">
import type { FormInstance } from 'ant-design-vue'
import { accountLogin, oauthLogin } from '@/api/user'

const open = ref(false)
export default defineComponent({
  setup() {
    const rules = {
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    }
    const { setOpen } = useModal()
    const userStore = useUserStore()
    const loading = ref(false)
    const oauthLoading = ref(false)
    const formRef = ref<FormInstance>()
    const passwordRef = ref()
    const form = reactive({
      username: 'admin',
      password: 'admin',
    })

    const router = useRouter()

    function handleLogin() {
      formRef.value?.validate()
        .then(async (validate: any) => {
          if (!validate)
            return
          loading.value = true
          accountLogin(form.username, form.password).then((accessToken) => {
            setToken(accessToken)
            userStore.init()
            notification.success({
              message: '登录成功',
              description: `欢迎 ${form.username}`,
            })
            setOpen(false)
          }).finally(() => {
            loading.value = false
          })
        })
    }

    async function handleOauthLogin() {
      const loading = message.loading('加载中', 0)
      oauthLoading.value = true
      const location = await oauthLogin('github')
      window.location.href = location
    }

    return {
      rules,
      loading,
      oauthLoading,
      formRef,
      passwordRef,
      form,
      router,
      open,
      setOpen,
      handleLogin,
      handleOauthLogin,
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
  <a-modal :footer="null" :open="open" :mask="false" width="400px" @cancel="setOpen(false)">
    <div class="flex items-center justify-center p-[2px]">
      <div class="w-[100%] rounded bg-white p-2">
        <div class="text-bold h-[50px] text-xl">
          登录
        </div>
        <a-form ref="formRef" :model="form" :rules="rules">
          <a-form-item name="username">
            <a-input v-model:value="form.username" placeholder="用户名" allow-clear @keyup.enter="passwordRef.focus()" />
          </a-form-item>
          <a-form-item name="password">
            <a-input-password
              ref="passwordRef" v-model:value="form.password" type="password" placeholder="密码" allow-clear
              @keyup.enter="handleLogin"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" class="w-full" :loading="loading" @click.stop="handleLogin">
              登录
            </a-button>
            <div class="mt-18px flex items-center justify-center text-[1.5em]">
              <div class="i-carbon-logo-github cursor-pointer" @click="handleOauthLogin" />
            </div>
          </a-form-item>
        </a-form>
        <div class="text-center">
          注册登录即表示同意 <span class="color-#1677ff">用户协议</span> 和 <span class="color-#1677ff">隐私政策</span>
        </div>
      </div>
    </div>
  </a-modal>
</template>
