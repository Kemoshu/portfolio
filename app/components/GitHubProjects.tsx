'use client'
import { useEffect, useState } from 'react'

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  created_at: string
  language: string
  fork: boolean
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])

  useEffect(() => {
    fetch('https://api.github.com/users/Kemoshu/repos')
      .then((res) => res.json())
      .then((data) => {
        // Sort by creation date descending and filter out forks
        const filtered = data
          .filter((repo: GitHubRepo) => !repo.fork)
          .sort(
            (a: GitHubRepo, b: GitHubRepo) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        setRepos(filtered)
      })
  }, [])

  return (
    <div>
      {repos.map((repo) => {
        const year = new Date(repo.created_at).getFullYear()
        return (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col space-y-1 mb-4"
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              {/* Year */}
              <p className="text-neutral-600 dark:text-neutral-400 w-[80px] tabular-nums">
                {year}
              </p>

              {/* Title */}
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {repo.name}
              </p>
            </div>

            {/* Optional tech stack (language) */}
            {repo.language && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 ml-[88px]">
                {repo.language}
              </p>
            )}

            {/* Optional description */}
            {repo.description && (
              <p className="text-sm text-neutral-400 dark:text-neutral-500 ml-[88px] italic">
                {repo.description}
              </p>
            )}
          </a>
        )
      })}
    </div>
  )
}
