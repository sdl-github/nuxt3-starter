import type { IUser } from './user'

export interface IComment {
  id: string
  published_at: string
  created_at: string
  user: IUser & { userId: string }
  content_markdown: string
  content_html: string
  like: number
}

export interface ISaveComment {
  id?: string
  content_markdown?: string
  content_html?: string
  postId?: string
}

export function createComment(data: ISaveComment): Promise<string> {
  return request({
    url: '/comment',
    method: 'POST',
    data,
  })
}

export function deleteComment(id: string) {
  return request({
    url: `/comment/${id}`,
    method: 'DELETE',
  })
}

export function updateArticle(data: ISaveComment) {
  return request({
    url: '/comment',
    method: 'PUT',
    data,
  })
}
