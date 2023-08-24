import { extractStyle } from 'ant-design-vue/es/_util/static-style-extract'
import fsExtra from 'fs-extra'

export async function genAntdStyle() {
  const css = extractStyle()
  await fsExtra.outputFile('public/css/antd.css', css, 'utf8')
}

genAntdStyle()
