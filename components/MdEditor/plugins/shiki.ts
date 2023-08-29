import type { BytemdPlugin } from 'bytemd'
import { BUNDLED_LANGUAGES, getHighlighter } from 'shiki-es'

export default function index(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      (async () => {
        const els = markdownBody.querySelectorAll('pre')
        if (els.length === 0)
          return

        const theme = 'github-light'
        const highlighter = await getHighlighter({ theme, langs: BUNDLED_LANGUAGES })

        els.forEach(async (el) => {
          const codeDom = el.querySelector('code')
          const code = codeDom?.innerText || ''
          const lang = Array.from(codeDom?.classList || [])?.find(name => name.includes('language'))?.split('language-')[1] || 'txt'

          const shikiCode = highlighter.codeToHtml(code, { lang })
          el.innerHTML = shikiCode
        })
      })()
    },
  }
}
