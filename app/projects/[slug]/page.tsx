import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import { getProjects } from 'app/projects/utils'

/* ───────── 1.  Pre-render every project slug ───────── */
export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

/* ───────── 2.  Page-level <head> metadata ──────────── */
export async function generateMetadata({
  params,           // <-- let Next infer the type
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = getProjects().find((p) => p.slug === params.slug)
  if (!project) return {}

  return {
    title: project.metadata.title,
    description: project.metadata.summary,
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.summary,
      images: project.metadata.image ? [project.metadata.image] : [],
    },
  }
}

/* ───────── 3.  Page component — no explicit PageProps ───────── */
export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = getProjects().find((p) => p.slug === params.slug)
  if (!project) notFound()

  return (
    <article className="prose dark:prose-invert mx-auto">
      <h1>{project.metadata.title}</h1>
      <p className="text-neutral-500 mb-6">{project.metadata.summary}</p>

      {/* Render the Markdown / MDX body */}
      <ReactMarkdown>{project.content}</ReactMarkdown>
    </article>
  )
}
