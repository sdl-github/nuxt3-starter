import type { IPage } from 'api'

export interface ITagPageParams {
  pageNo: number
  pageSize: number
  searchKeyWord?: string
}
export interface ITag {
  id: string
  name: string
  icon?: string
}
export function queryTagPage(params: ITagPageParams): Promise<IPage<ITag>> {
  return request({
    url: 'tags',
    params,
  })
}
