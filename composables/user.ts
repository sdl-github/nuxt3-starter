import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IUser } from '@/api/user'
import { userInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>()
  async function queryUserInfo() {
    const res = await userInfo()
    user.value = res
    return res
  }

  async function init() {
    return await Promise.all([queryUserInfo()])
  }
  return {
    user,
    init,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
