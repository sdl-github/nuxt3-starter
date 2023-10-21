<script setup lang="ts">
import LoginModal, { useModal } from './LoginModal.vue'
import UserSettingModal from './UserSettingModal.vue'
import { logout } from '@/api/user'

const userSettingModalRef = ref()
const userStore = useUserStore()
const user = computed(() => userStore.user)
const router = useRouter()

const model = useModal()

function handleOpenLogin() {
  model.setOpen(true)
}

async function handleLogout() {
  try {
    const loading = message.loading('加载中')
    await logout()
    loading()
    userStore.logout()
    message.success('退出成功')
  }
  catch (error) {
  }
}

function handleOpenSetting() {
  userSettingModalRef.value.start()
}
</script>

<template>
  <a-layout-header class="layout-header">
    <div class="m-auto h-[100%] max-w-[980px] flex items-center justify-between">
      <div class="gradient-text cursor-pointer text-xl font-bold">
        <NuxtLink to="/">
          Cloud Note
        </NuxtLink>
      </div>
      <ClientOnly fallback-tag="span">
        <!-- this component will only be rendered on client side -->
        <div class="flex cursor-pointer items-center">
          <template v-if="user?.id">
            <a-dropdown>
              <a-avatar :size="32" :src="user?.avatar">
                {{ user?.nickname }}
              </a-avatar>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <template #icon>
                      <div class="i-carbon-user-avatar" />
                    </template>
                    <NuxtLink :to="`/user/${user.id}`">
                      个人中心
                    </NuxtLink>
                  </a-menu-item>
                  <a-menu-item @click="handleOpenSetting">
                    <template #icon>
                      <div class="i-carbon-settings" />
                    </template>
                    <UserSettingModal ref="userSettingModalRef" />
                    <span>
                      账户设置
                    </span>
                  </a-menu-item>
                  <a-menu-item @click="handleLogout">
                    <template #icon>
                      <div class="i-carbon-logout" />
                    </template>
                    退出
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-dropdown>
              <span class="ml-4 text-sm">
                <a-button type="primary">新建</a-button>
              </span>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <template #icon>
                      <div class="i-carbon-document" />
                    </template>
                    <NuxtLink to="/article/edit">
                      文章
                    </NuxtLink>
                  </a-menu-item>
                  <a-menu-item>
                    <template #icon>
                      <div class="i-carbon-carbon" />
                    </template>
                    <NuxtLink to="/scraps/new">
                      思绪碎片
                    </NuxtLink>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
          <template v-else>
            <LoginModal />
            <a-button class="ml-4" @click="handleOpenLogin">
              登录
            </a-button>
          </template>
        </div>
        <template #fallback>
          <!-- this will be rendered on server side -->
          <a-spin />
        </template>
      </ClientOnly>
    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  z-index: 1;
  align-items: center;
  width: 100%;
  background: #fff;
  padding: 0;
}

.gradient-text {
  // background-image: linear-gradient(20deg, #E21143, #FFB03A);
  background-image: linear-gradient(to right, #00c6fb 0%, #005bea 100%);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  user-select: none;
}
</style>
