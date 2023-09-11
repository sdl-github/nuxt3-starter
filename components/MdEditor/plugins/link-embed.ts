import type { BytemdPlugin } from 'bytemd'
import type { Root } from 'hast'
import type { Transformer } from 'unified'
import { SKIP, visit } from 'unist-util-visit'
import { h } from 'hastscript'
import { embedUrl } from '@/utils/request'

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

function rehypeLink(): void | Transformer<Root, Root> {
  return (tree, vfile) => {
    visit(tree, (node, index, parent) => {
      if (!urlRegex.test(node.value))
        return

      const url = `${embedUrl}?url=${node.value}`
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
        h('div', { class: 'preview-url-card' }, h('iframe', { src: url, frameborder: '0', scrolling: 'no', loading: 'lazy', height: '122', width: '100%', class: 'preview-url-link' }))

      if (parent && index !== null) {
        parent.children[index] = component()
        // This return value makes sure that the traversal continues by
        // visiting the children of the replaced node (if any)
        return [SKIP, index]
      }
    })
  }
}

export default function linkEmbed(): BytemdPlugin {
  return {
    rehype: processor => processor.use(rehypeLink),
  }
}
