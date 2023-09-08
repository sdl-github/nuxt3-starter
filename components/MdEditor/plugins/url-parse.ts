import type { BytemdPlugin } from 'bytemd'
import { visit } from 'unist-util-visit'
import { isElement } from 'hast-util-is-element'
import type { ElementContent, Properties, Root } from 'hast'
import type { VFile } from 'vfile'
import { h } from 'hastscript'
import './style.css'
import { parseGithubRepo } from '@/api/urlparse'

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
async function rehypeUrl() {
  return (tree, vfile) => {
    visit(tree, (node, index, parent) => {
      if (!isElement(node))
        return
      if (node.tagName !== 'a')
        return

      const url = node.properties?.href as string
      const fullname = extractFullnameFromGithubLink(url)
      let data = {}
      parseGithubRepo(fullname).then((res) => {
        console.log(res)
        data = res
      })

      // const data = {
      //   owner: 'bytedance',
      //   name: 'bytemd',
      //   full_name: 'bytedance/bytemd',
      //   description: 'Hackable Markdown Editor and Viewer',
      //   html_url: 'https://github.com/bytedance/bytemd',
      //   language: 'TypeScript',
      //   stargazers_count: 4199,
      //   forks_count: 310,
      // }

      const component = (properties: Properties) =>
        h('div', { class: 'preview-url-card' }, h('a', { href: properties.href, target: '_blank', class: 'preview-url-link' }, [
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

      if (component && parent && index !== null) {
        const replacedNode = component(
          node.properties || {},
        )
        parent.children[index] = replacedNode
        // This return value makes sure that the traversal continues by
        // visiting the children of the replaced node (if any)
      }
    })
  }
}

export default function urlParse(): BytemdPlugin {
  return {
    rehype: processor => processor.use(rehypeUrl),
  }
}
