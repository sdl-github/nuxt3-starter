<script setup lang="ts">
import type { IUser } from '@/api/user'
import { updateUserProfile } from '@/api/user'

const activeKey = ref('profile')
const userStore = useUserStore()
const user = computed(() => userStore.user)

const loading = ref(false)
const formState = reactive<IUser>({
  nickname: '',
  note: '',
})

watchEffect(() => {
  formState.nickname = user.value?.nickname
  formState.note = user.value?.note
})

async function onFinish() {
  // const loading = message.loading('加载中', 0)
  loading.value = true
  try {
    await updateUserProfile(formState)
    loading.value = false
    userStore.init()
    message.success('成功')
    return true
  }
  catch (e) {
    loading.value = false
    return false
  }
}
</script>

<template>
  <div class="m-auto w-[980px] pt-10">
    <div class="text-[2em] font-bold">
      设置
    </div>
    <div class="py-5">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="profile" tab="个人资料">
          <div class="flex py-2">
            <a-avatar :size="72" :src="user?.avatar">
              {{ user?.nickname }}
            </a-avatar>
            <div class="ml-10 w-[520px]">
              <a-form
                :model="formState"
                layout="vertical"
                autocomplete="off"
                @finish="onFinish"
              >
                <a-form-item
                  label="用户名"
                  name="username"
                >
                  <a-input :value="user?.username" disabled />
                </a-form-item>
                <a-form-item
                  label="昵称"
                  name="nickname"
                  :rules="[{ required: true, message: '请输入' }]"
                >
                  <a-input v-model:value="formState.nickname" />
                </a-form-item>

                <a-form-item
                  label="自我介绍"
                  name="note"
                >
                  <a-textarea v-model:value="formState.note" />
                </a-form-item>
                <a-form-item>
                  <a-button :loading="loading" type="primary" html-type="submit">
                    保存
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
