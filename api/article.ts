import type { IUser } from './user'

export interface IPage<O> {
  hasNextPage?: boolean
  rows: O[]
  total: number
  pageNo: number
  pageSize: number
}

export interface IArticlePageParams {
  pageNo: number
  pageSize: number
}

export interface IArticle {
  id: string
  title: string
  desc: string
  icon: string
  userId: string
  like: number
  published_at: string
  created_at: string
  user: IUser
}

export function queryArticlePage(params: IArticlePageParams): Promise<IPage<IArticle>> {
  return request({
    url: '/post',
    method: 'GET',
    params,
  })
}
