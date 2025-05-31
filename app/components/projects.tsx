import Link from 'next/link'
import { getProjects } from 'app/projects/utils'

export function ProjectsList() {
  const allProjects = getProjects()

  return (
    <div>
      {allProjects
        /* ── newest first by year (numeric) ───────────────────────────── */
        .sort((a, b) => Number(b.metadata.year) - Number(a.metadata.year))
        .map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="flex flex-col space-y-1 mb-4"
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              {/* Year */}
              <p className="text-neutral-600 dark:text-neutral-400 w-[80px] tabular-nums">
                {project.metadata.year}
              </p>

              {/* Title */}
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {project.metadata.title}
              </p>
            </div>

            {/* Optional tech stack line */}
            {project.metadata.tech && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 ml-[88px]">
                {project.metadata.tech}
              </p>
            )}
          </Link>
        ))}
    </div>
  )
}
