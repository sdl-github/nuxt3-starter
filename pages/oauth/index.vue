<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const token = route.query.accessToken
if (token) {
  setToken(token as string)
  message.success('登录成功')
  router.push('/')
}
</script>

<template>
  <div class="h-100vh w-full flex items-center justify-center">
    <a-spin />
  </div>
</template>
