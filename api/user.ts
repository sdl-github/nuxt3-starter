export function accountLogin(username: string, password: string): Promise<string> {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      username,
      password,
    },
  })
}

export interface IUser {
  id?: string
  username?: string
  nickname?: string
  avatar?: string
  note?: string
}

export function userInfo(): Promise<IUser> {
  return request({
    url: '/user/userInfo',
  })
}

export function updateUserProfile(data: IUser) {
  return request({
    url: '/user/profile',
    method: 'PUT',
    data,
  })
}
