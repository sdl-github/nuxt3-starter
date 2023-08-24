import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IUser } from '@/api/user'
import { userInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>()
  const router = useRouter()
  async function queryUserInfo() {
    const res = await userInfo()
    user.value = res
    return res
  }

  async function init() {
    return await Promise.all([queryUserInfo()])
  }

  function logout() {
    user.value = {}
    removeToken()
    router.push('/')
  }

  return {
    user,
    init,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
