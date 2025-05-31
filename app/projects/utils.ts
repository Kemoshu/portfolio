// app/projects/utils.ts
import fs from 'fs'
import path from 'path'

/* ---------------------------------------------------------- *
 * 1.  Metadata keys — extend or change as you add frontmatter
 * ---------------------------------------------------------- */
type ProjectMetadata = {
  title: string
  year: string | number
  summary: string
  image?: string
  tech?: string   // e.g. "Next.js, TypeScript"
}

/* ---------------------------------------------------------- *
 * 2.  Front-matter parser  (unchanged from blog version)
 * ---------------------------------------------------------- */
function parseFrontmatter(fileContent: string) {
  const fmRegex = /---\s*([\s\S]*?)\s*---/
  const match = fmRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(fmRegex, '').trim()

  const metadata: Partial<ProjectMetadata> = {}
  frontMatterBlock
    .trim()
    .split('\n')
    .forEach((line) => {
      const [rawKey, ...valueArr] = line.split(': ')
      const key = rawKey.trim() as keyof ProjectMetadata
      let value = valueArr.join(': ').trim()
      value = value.replace(/^['"](.*)['"]$/, '$1') // strip quotes
      metadata[key] = value
    })

  return { metadata: metadata as ProjectMetadata, content }
}

/* ---------------------------------------------------------- *
 * 3.  Generic MDX helpers (unchanged)
 * ---------------------------------------------------------- */
function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((f) => path.extname(f) === '.mdx')
}

function readMDXFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(raw)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return { metadata, slug, content }
  })
}

/* ---------------------------------------------------------- *
 * 4.  Public API — call this in your Projects list component
 * ---------------------------------------------------------- */
export function getProjects() {
  return getMDXData(
    path.join(process.cwd(), 'app', 'projects', 'posts') // <— folder holding .mdx files
  )
}

/* ---------------------------------------------------------- *
 * 5.  Date helper (optional) — you can delete if unused
 * ---------------------------------------------------------- */
export function formatYear(year: string | number) {
  return year.toString()
}
