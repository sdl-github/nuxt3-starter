import type { IUser } from './user'
import type { IComment } from './comment'
import type { IPage } from '@/api'

export interface IArticlePageParams {
  pageNo: number
  pageSize: number
  userId?: string
  searchKeyWord?: string
  type?: string
}

export interface ITag {
  tagId: string
  tagName: string
  tagIcon?: string
}

export interface IArticle {
  id: string
  title: string
  desc: string
  icon: string
  userId: string
  type: string
  like: number
  comments_count: number
  see: number
  published_at: string
  created_at: string
  updated_at?: string
  is_pinned?: boolean
  user: IUser
  content_markdown: string
  content_html: string
  tags?: ITag[]
  comments: IComment[]
}

export function queryArticlePage(params: IArticlePageParams): Promise<IPage<IArticle>> {
  return request({
    url: '/post',
    method: 'GET',
    params,
  })
}

export interface ISaveArticle {
  id?: string
  title: string
  desc?: string
  icon?: string
  type?: string
  content_html?: string
  content_markdown?: string
  tags?: string[]
}

export function saveArticle(data: ISaveArticle): Promise<{ id: string }> {
  return request({
    url: '/post',
    method: 'POST',
    data,
  })
}

export function updateArticle(data: ISaveArticle): Promise<{ id: string }> {
  return request({
    url: '/post',
    method: 'PUT',
    data,
  })
}

export function queryArticleDetail(id: string): Promise<IArticle> {
  return request({
    url: `/post/${id}`,
  })
}

export function deleteArticle(id: string) {
  return request({
    url: `/post/${id}`,
    method: 'DELETE',
  })
}
