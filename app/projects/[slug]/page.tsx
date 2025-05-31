// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjects } from 'app/projects/utils'

/* ─────────────────────────────────────────────────────────────
 * 1.  Tell Next which slugs to prerender
 * ──────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

/* ─────────────────────────────────────────────────────────────
 * 2.  Metadata — MUST be async so `params` can be awaited
 * ──────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
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

/* ─────────────────────────────────────────────────────────────
 * 3.  Page component — also async for consistency
 * ──────────────────────────────────────────────────────────── */
export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = getProjects().find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  /* Render the MDX content you stored earlier */
  return (
    <article className="prose dark:prose-invert mx-auto">
      <h1>{project.metadata.title}</h1>
      <p className="text-neutral-500 mb-6">{project.metadata.summary}</p>

      {/* Unless you’ve set up an MDX bundler, this could be <MDXRemote /> etc. */}
      {/* For now, just dump the raw content */}
      <div dangerouslySetInnerHTML={{ __html: project.content }} />
    </article>
  )
}
