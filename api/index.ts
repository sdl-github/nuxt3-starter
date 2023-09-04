export interface IPage<O> {
  hasNextPage?: boolean
  rows: O[]
  total: number
  pageNo?: number
  pageSize?: number
}
