import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Kevin Pierce Chan Ramos
      </h1>
      <p className="mb-4">
        {`Full-stack engineer who's eager to learn and grow. Passionate about building anything and everything. 
  Always looking for new challenges and opportunities to improve my skills.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
