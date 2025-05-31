import { ProjectsList } from 'app/components/projects'

export const metadata = {
  title: 'Projects',
  description: 'Selected personal and academic projects.',
}

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Projects</h1>
      <ProjectsList />
    </section>
  )
}
