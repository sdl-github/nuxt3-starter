import type { IPage } from '@/api'

export interface ITagPageParams {
  pageNo: number
  pageSize: number
  searchKeyWord?: string
}
export interface ITag {
  id: string
  name: string
  icon?: string
  usage_count?: number
}
export function queryTagPage(params: ITagPageParams): Promise<IPage<ITag>> {
  return request({
    url: 'tags',
    params,
  })
}

export function queryAllTags(): Promise<ITag[]> {
  return request({
    url: '/allTags',
  })
}
