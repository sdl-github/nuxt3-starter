import { acceptHMRUpdate, defineStore } from 'pinia'

interface IUser {
  id: string
  username: string
  nickname: string
  avatar?: string
}
export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>()

  return {
    user,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
