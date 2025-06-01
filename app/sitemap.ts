export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap() {
  // Fetch GitHub repos (replace `Kemoshu` with your GitHub username if needed)
  const res = await fetch('https://api.github.com/users/Kemoshu/repos', {
    headers: {
      Accept: 'application/vnd.github+json',
    },
    // Optional: revalidate periodically
    next: { revalidate: 3600 }, // cache for 1 hour
  })

  const data = await res.json()

  const githubProjects = data
    .filter((repo: any) => !repo.fork)
    .map((repo: any) => ({
      url: `${baseUrl}/projects/${repo.name}`,
      lastModified: repo.updated_at.split('T')[0],
    }))

  const staticRoutes = ['', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...staticRoutes, ...githubProjects]
}
