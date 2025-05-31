import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import { getProjects } from 'app/projects/utils'

/* ──────────────── 1. Pre-render every slug ──────────────── */
export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

/* ──────────────── 2. Metadata (Next infers the shape) ──────────────── */
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = getProjects().find((p) => p.slug === params.slug)
  if (!project) {
    return {}
  }

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

/* ──────────────── 3. Page component (no explicit types) ──────────────── */
export default async function ProjectPage({ params }) {
  const project = getProjects().find((p) => p.slug === params.slug)
  if (!project) {
    notFound()
  }

  return (
    <article className="prose dark:prose-invert mx-auto">
      <h1>{project.metadata.title}</h1>
      <p className="text-neutral-500 mb-6">{project.metadata.summary}</p>
      <ReactMarkdown>{project.content}</ReactMarkdown>
    </article>
  )
}
