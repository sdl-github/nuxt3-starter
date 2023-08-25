<script setup lang="ts">
import type { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import AvatarCropperModal, { useModal } from '@/components/AvatarCropperModal.vue'
import type { IUser } from '@/api/user'
import { updateUserProfile } from '@/api/user'
import { uploadFileToKv } from '@/api/file'

const activeKey = ref('profile')
const userStore = useUserStore()
const user = computed(() => userStore.user)
const avatarModal = useModal()
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

function handleOpenAvatarCropper({ file }: UploadRequestOption) {
  // const url = 'https://images.unsplash.com/photo-1516007445015-fc20d86f8468?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  const url = URL.createObjectURL(file as File)
  avatarModal.start(url)
}

async function handleUploadAvatar({ blob }: { blob: Blob }) {
  const loading = message.loading('加载中', 0)
  try {
    const avatar = await uploadFileToKv(blob)
    await updateUserProfile({ avatar })
    userStore.init()
    loading()
    message.success('成功')
    return true
  }
  catch (e) {
    loading()
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
            <AvatarCropperModal @ok="handleUploadAvatar" />
            <a-upload
              name="file"
              accept="image/png, image/jpeg"
              :show-upload-list="false"
              :custom-request="handleOpenAvatarCropper"
            >
              <div class="relative cursor-pointer">
                <a-avatar :size="72" :src="user?.avatar" :alt="user?.nickname">
                  {{ user?.nickname }}
                </a-avatar>
                <div class="absolute right-[-10px] top-[50px] h-[25px] w-[25px] flex items-center justify-center rounded-[50%] bg-#e8f3ff">
                  <div class="i-carbon-cloud-upload color-#1677ff" />
                </div>
              </div>
            </a-upload>

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
