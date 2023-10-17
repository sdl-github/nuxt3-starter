<script lang="ts" setup>
import UserSetPassword from './UserSetPassword.vue'
import { getLoginRecords } from '@/api/user'

const emits = defineEmits(['ok'])
const open = ref(false)

interface IForm { }

const form = ref<IForm>({

})

enum ShowKey {
  setting,
  passwordSetting,
}

const userStore = useUserStore()

watchEffect(() => {
  if (open.value)
    userStore.init()
})

const showKey = ref(ShowKey.setting)

const user = computed(() => userStore.user)

const { data: loginRecords } = useAsyncData(`getLoginRecords/${user.value?.id}`, () => getLoginRecords())

const activeKey = ref('account')

function ok() {
  emits('ok', unref(form))
}

function cancel() {
  open.value = false
}

function start(source?: IForm) {
  open.value = true
  showKey.value = ShowKey.setting
}

function back() {
  showKey.value = ShowKey.setting
}

defineExpose({
  start,
})
</script>

<template>
  <a-modal
    :footer="false" :closable="true" :open="open" :mask-closable="false" :mask="true" width="600px"
    :mask-style="{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(243, 244, 246, 0.1)' }" @cancel="cancel" @ok="ok"
  >
    <div class="">
      <a-tabs v-model:activeKey="activeKey" tab-position="left">
        <a-tab-pane key="account" tab="账户">
          <div class="text-25px font-bold">
            账户
          </div>
          <div class="mt-1">
            管理您的账户信息
          </div>
          <div class="mt-4 font-bold">
            个人资料
          </div>
          <a-divider class="my-2" />
          <div class="w-full flex cursor-pointer items-center rounded-[7px] p-2 hover:bg-[#EFEFEF]">
            <a-avatar :size="50" :src="user?.avatar" :alt="user?.nickname">
              {{ user?.nickname }}
            </a-avatar>
            <div class="ml-4">
              {{ user?.nickname }}
            </div>
          </div>
          <div class="mt-4 font-bold">
            已连接的账户
          </div>
          <a-divider class="my-2" />
        </a-tab-pane>
        <a-tab-pane key="security" tab="安全">
          <template v-if="showKey === ShowKey.setting">
            <div class="text-25px font-bold">
              安全
            </div>
            <div class="mt-1">
              管理您的安全设置
            </div>
            <div class="mt-4 font-bold">
              密码
            </div>
            <a-divider class="my-2" />
            <div>
              <a-button @click="() => showKey = ShowKey.passwordSetting">
                {{ user?.passwordEnable ? "修改密码" : "设置密码" }}
              </a-button>
            </div>
            <div class="mt-4 font-bold">
              活动设备
            </div>
            <a-divider class="my-2" />
            <div class="max-h-400px overflow-auto">
              <div v-for="(record, index) in loginRecords" :key="index">
                <div class="flex cursor-pointer items-center rounded-[7px] p-2 hover:bg-[#EFEFEF]">
                  <div class="h-80px w-80px">
                    <SvgIcon :name="record.deviceInfo.isMobile ? 'phone' : 'pc'" class="h-80px w-80px" />
                  </div>
                  <div class="ml-4">
                    <div class="flex">
                      <div>
                        {{ record.deviceInfo.device.model || '未知' }}
                      </div>
                      <div v-if="record.current" class="ml-2 text-#1677ff">
                        当前设备
                      </div>
                    </div>
                    <div class="text-12px text-#000-300">
                      <div>
                        <span>{{ record.deviceInfo.browser.name }}</span>
                        <span class="ml-2">{{ record.deviceInfo.browser.version }}</span>
                      </div>
                      <div>{{ record.deviceInfo.ip }}</div>
                      <div>{{ record.created_at }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <UserSetPassword v-if="showKey === ShowKey.passwordSetting" @back="back" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>
