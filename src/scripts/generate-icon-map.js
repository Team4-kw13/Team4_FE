import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = resolve(__dirname, '../..')
const ASSETS_DIR = join(rootDir, 'src/assets')
const OUTPUT_DIR = join(rootDir, 'src/components/Icon')
const OUTPUT_FILE = join(OUTPUT_DIR, 'iconMap.js')

/** SVG 파일 경로나 이름을 CamelCase 변수명으로 변환 */
const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase()).replace(/\.svg$/, '')
}

/** assets 디렉토리의 하위 폴더 목록 가져오기 */
const getAssetFolders = (assetsDir) => {
  return readdirSync(assetsDir).filter((folder) => {
    const folderPath = join(assetsDir, folder)
    return statSync(folderPath).isDirectory()
  })
}

/** 특정 폴더 안의 .svg 파일들을 순회하여 imports와 mapEntries 생성 */
const collectIconsFromFolder = (folder, assetsDir) => {
  const folderPath = join(assetsDir, folder)
  const files = readdirSync(folderPath).filter((file) => file.endsWith('.svg'))

  const imports = []
  const mapEntries = []

  for (const file of files) {
    const importKey = file.replace('.svg', '')
    const varName = toCamelCase(`${folder}-${file}`)
    const importPath = `@/assets/${folder}/${file}`

    imports.push(`import ${varName} from '${importPath}?react'`)
    mapEntries.push(`  '${importKey}': ${varName},`)
  }

  return { imports, mapEntries }
}

/** iconMap.js 파일 내용을 생성 */
const buildIconMapFileContent = (imports, mapEntries) => {
  return `${imports.join('\n')}

export const iconMap = {
${mapEntries.join('\n')}
}
`
}

/** 아이콘 폴더를 스캔하여 iconMap.js 파일을 생성 */
const generateIconMap = () => {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  let allImports = []
  let allMapEntries = []
  const folders = getAssetFolders(ASSETS_DIR)

  for (const folder of folders) {
    const { imports, mapEntries } = collectIconsFromFolder(folder, ASSETS_DIR)
    allImports = allImports.concat(imports)
    allMapEntries = allMapEntries.concat(mapEntries)
  }

  const content = buildIconMapFileContent(allImports, allMapEntries)
  writeFileSync(OUTPUT_FILE, content)
}

generateIconMap()
