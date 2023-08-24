<script setup lang="ts">
const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>

<template>
  <a-layout-header class="layout-header">
    <div class="m-auto h-[100%] max-w-[980px] flex items-center justify-between">
      <div class="gradient-text cursor-pointer text-xl font-bold">
        Cloud Logo
      </div>
      <div class="flex cursor-pointer items-center">
        <template v-if="user?.id">
          <a-dropdown>
            <div>
              <a-avatar style="background-color: #1890ff" :src="user?.avatar">
                {{ user?.username }}
              </a-avatar>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <template #icon>
                    <div class="i-ri-logout-box-line" />
                  </template>
                  退出
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
        <template v-else>
          <a-button class="ml-4" type="primary">
            登录
          </a-button>
        </template>
      </div>
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
    //   background-image: linear-gradient(20deg, #E21143, #FFB03A);
    background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    user-select: none;
}
</style>
