// highlight
import highlight from '@bytemd/plugin-highlight'
import 'highlight.js/styles/androidstudio.css'

import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'

export const plugins = [
  gemoji(),
  breaks(),
  frontmatter(),
  gfm(),
  highlight(),
]
