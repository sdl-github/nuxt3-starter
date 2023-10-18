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

export function oauthLogin(type: string): Promise<string> {
  return request({
    url: `/user/oauth/${type}`,
  })
}

export interface IUser {
  id?: string
  userId?: string
  username?: string
  nickname?: string
  avatar?: string
  note?: string
  passwordEnable?: boolean
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

export function queryUserInfoByUserId(userId: string): Promise<IUser> {
  return request({
    url: `/user/${userId}`,
  })
}

export function setPassword(data: { oldPassword: string; newPassword: string }) {
  return request({
    url: '/user/setPassword',
    method: 'POST',
    data,
  })
}

export function getLoginRecords() {
  return request({
    url: '/user/loginRecords',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'POST',
  })
}

export function revoke(params: { id: string }) {
  return request({
    url: '/user/revoke',
    method: 'POST',
    params,
  })
}
