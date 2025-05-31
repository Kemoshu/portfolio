// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata, PageProps } from 'next'
import ReactMarkdown from 'react-markdown'
import { getProjects } from 'app/projects/utils'

/* ──────────────────────────────────────────────────────── */
/* 1.  Pre-render all slugs                                */
/* ──────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

/* ──────────────────────────────────────────────────────── */
/* 2.  Metadata block (async, using PageProps so TS is happy) */
/* ──────────────────────────────────────────────────────── */
export async function generateMetadata(
  props: PageProps<{ slug: string }>
): Promise<Metadata> {
  const { slug } = props.params
  const project = getProjects().find((p) => p.slug === slug)
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

/* ──────────────────────────────────────────────────────── */
/* 3.  The page component (async, using PageProps as well)    */
/* ──────────────────────────────────────────────────────── */
export default async function ProjectPage(
  props: PageProps<{ slug: string }>
) {
  const { slug } = props.params
  const project = getProjects().find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="prose dark:prose-invert mx-auto">
      <h1>{project.metadata.title}</h1>
      <p className="text-neutral-500 mb-6">{project.metadata.summary}</p>

      {/* Render the Markdown/MDX body */}
      <ReactMarkdown>{project.content}</ReactMarkdown>
    </article>
  )
}

