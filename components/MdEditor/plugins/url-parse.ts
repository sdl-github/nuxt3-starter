import type { BytemdPlugin } from 'bytemd'
import type { ElementContent, Properties, Root } from 'hast'
import type { VFile } from 'vfile'
import { h } from 'hastscript'
import type { Transformer } from 'unified'
import { visit } from 'unist-util-visit'

import './style.css'

export type ComponentFunction = (
  props: Properties,
  children: ElementContent[],
  context: ComponentContext
) => ElementContent

export interface ComponentContext {
  tree: Root
  vfile: VFile
  processor: any
}

interface Options {
  components: Record<string, ComponentFunction>
}
function extractFullnameFromGithubLink(link) {
  // 正则表达式模式
  const regexPattern = /github\.com\/([^\/]+\/[^\/]+)$/i

  // 从链接中提取fullname
  const matches = link.match(regexPattern)

  // 检查是否找到了匹配
  if (matches && matches.length > 1)
    return matches[1]

  // 没有找到匹配
  return null
}

const urlDataCache = new Map()
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

function rehypeUrl(): void | Transformer<Root, Root> {
  return async (tree, vfile) => {
    visit(tree, (node, index, parent) => {
      if (!node.value)
        return

      if (!urlRegex.test(node.value))
        return

      const loading = true
      const data = {
        owner: 'bytedance',
        name: 'bytemd',
        full_name: 'bytedance/bytemd',
        description: 'Hackable Markdown Editor and Viewer',
        html_url: 'https://github.com/bytedance/bytemd',
        language: 'TypeScript',
        stargazers_count: 4199,
        forks_count: 310,
      }

      const component = () =>
        h('div', { class: 'preview-url-card' }, h('a', { href: data.html_url, target: '_blank', class: 'preview-url-link' }, [
          h('div', { class: 'preview-link-name' }, [
            h('span', {}, data.owner),
            h('span', { class: 'preview-link-clash' }, '/'),
            h('span', {}, data.name),
          ]),
          h('div', { class: 'preview-link-description' }, data.description),
          h('div', { class: 'preview-link-meta-container' }, [
            h('span', { class: 'preview-link-meta' }, data.stargazers_count),
            h('span', { class: 'preview-link-meta' }, data.forks_count),
            h('span', { class: 'preview-link-meta' }, data.language),
          ]),
        ]))

      if (parent && index !== null) {
        const replacedNode = component()
        parent.children[index] = replacedNode
        // This return value makes sure that the traversal continues by
        // visiting the children of the replaced node (if any)
        return [SKIP, index]
      }
    })
  }
}

export default function urlParse(): BytemdPlugin {
  return {
    rehype: processor => processor.use(rehypeUrl),
  }
}
