export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  if (getToken() && !userStore.user?.id) {
    try {
      await userStore.init()
    }
    catch (e) {
      console.log('err', e)
    }
  }
})
