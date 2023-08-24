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
  id: string
  username: string
  nickname: string
  avatar?: string
}

export function userInfo(): Promise<IUser> {
  return request({
    url: '/user/userInfo',
  })
}
