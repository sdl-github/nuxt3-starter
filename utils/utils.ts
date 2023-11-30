export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    }
    else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function nFormatter(num: number, digits?: number) {
  if (!num)
    return '0'
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find((item) => {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol
    : '0'
}

export function capitalize(str: string) {
  if (!str || typeof str !== 'string')
    return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncate(str: string, length: number) {
  if (!str || str.length <= length)
    return str
  return `${str.slice(0, length)}...`
}

export function setLocalStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined')
    return null

  localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage<T>(key: string): T | null {
  if (typeof window === 'undefined')
    return null
  const item = localStorage.getItem(key)
  if (item)
    return JSON.parse(item)

  return null
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key)
}

function full(p: number) {
  return p < 10 ? `0${p}` : p
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()

  return (
    `${year
    }-${
    full(mon)
    }-${
    full(day)
    } ${
    full(hour)
    }:${
    full(min)
    }:${
    full(sec)}`
  )
}

export function getFileSize(size: number) {
  if (!size)
    return '-'

  const num = 1024.0 // byte

  if (size < num)
    return `${size}B`
  if (size < num ** 2)
    return `${(size / num).toFixed(2)}K` // kb
  if (size < num ** 3)
    return `${(size / num ** 2).toFixed(2)}M` // M
  if (size < num ** 4)
    return `${(size / num ** 3).toFixed(2)}G` // G
  return `${(size / num ** 4).toFixed(2)}T` // T
}

export function getRandomColor(seed: string) {
  const colors = ['processing', 'success', 'error', 'warning', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  function hashCode(str: string) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = Math.imul(31, hash) + str.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }
    return Math.abs(hash)
  }
  const randomIndex = hashCode(seed) % colors.length
  return colors[randomIndex]
}
