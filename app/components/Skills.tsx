// app/components/Skills.tsx

export const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'C++',
  'Python',
  'TypeScript',
  'React/Next.js',
  'Node.js',
  'Tailwind CSS',
  'Docker',
  'Workflow Automation',
  'CI/CD',
  'Git',
  'Github',
] as const

type Props = { className?: string }

export default function Skills({ className = '' }: Props) {
  return (
    <aside
      className={`
        mt-12 md:mt-0
        md:sticky md:top-32
        md:w-48 lg:w-56            /* 192 / 224 px sidebar */
        ${className}
      `}
    >
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Skills</h2>

      <ul className="flex flex-wrap gap-2 md:flex-col">
        {skills.map((skill) => (
          <li
            key={skill}
            className="
              rounded-lg bg-neutral-100 px-3 py-1
              text-sm font-medium text-neutral-700
              dark:bg-neutral-800 dark:text-neutral-200
            "
          >
            {skill}
          </li>
        ))}
      </ul>
    </aside>
  )
}
