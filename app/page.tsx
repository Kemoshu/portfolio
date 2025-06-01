import GitHubProjects from 'app/components/GitHubProjects'
import Skills from 'app/components/Skills'

export default function HomePage() {
  return (
    <main className="w-full md:flex md:gap-4 lg:gap-6 xl:gap-8">
      {/* ───────── LEFT / MAIN COLUMN ───────── */}
      <div className="flex-1">
        <section className="w-full">
          <h1 className="mb-8 text-3xl font-semibold tracking-tight">
            Kevin Pierce Chan Ramos
          </h1>
          <p className="mb-6 text-lg leading-relaxed">
            {`I’m Kevin Ramos — a UNLV Computer Science grad and seasoned developer 
            fluent across the stack. I craft pixel-perfect front ends with HTML & CSS, 
            engineer robust back-end logic in Python and performance-critical modules in C++, 
            and ship everything in production-ready Docker containers. My track record spans a React/Node/PostgreSQL web app, 
            an LLVM-inspired Espresso compiler, and AWS architectures tuned for cost, security, and speed. 
            Whether I’m optimizing algorithms, automating CI pipelines, or refining UX, 
            I turn complex ideas into elegant, reliable software. If you need a developer 
            who pairs deep technical mastery with clear communication and user-focused design, let’s connect.`}
          </p>
          <h1 className="mb-4 text-2xl font-semibold tracking-tight"> 
              {"Education"}
          </h1>
          <p className="mb-6 text-lg leading-relaxed">
            {`Bachelor of Science in Computer Science, University of Nevada, Las Vegas (UNLV), 2020-2025`}
            <br />
            {` Built a solid foundation in software engineering, algorithms, and systems while completing hands-on 
              projects that mirror real-world workloads. Highlights include: Capstone & Projects:
              Espresso — a Java-like compiler leveraging LLVM concepts for optimized bytecode generation.
              Full-stack web application (React ∙ Node ∙ PostgreSQL) deployed on AWS with Dockerized micro-services and CI/CD pipelines.
              Key Coursework: Advanced Algorithms, Operating Systems (xv6), Cloud Computing & DevOps, Database Systems, Computer Networks. `}
          </p>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">
            {"Projects"}
          </h2>
          <p className="mb-6 text-lg leading-relaxed">
            {`Here are some of my notable projects:`}
          </p>
           <GitHubProjects />
        </section>
        <br />
        <section>
          <div>
        <p>
          {`Contact me at:`}
          <br />
          {`Email: ramosk.dev@gmail.com`}
          <br />
          {`Phone Number: (702) 201-6136 `}
          <br />
        </p>
      </div>
        </section>
      </div>

      {/* ───────── RIGHT / SKILLS RAIL ───────── */}
      <Skills className="md:ml-auto" />
    </main>
  )
}
