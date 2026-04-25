import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Writing — Kanishk Pansari",
  description: "Thoughts on data, engineering, and building things.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="h-10 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-md sticky top-0 z-20">
        <Link href="/" className="font-mono text-[11px] tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase">
          ← Kanishk Pansari
        </Link>
        <span className="font-mono text-[11px] tracking-widest text-foreground/80 uppercase">Writing</span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-12">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </h1>

        {posts.length === 0 && (
          <p className="font-mono text-sm text-muted-foreground">No posts yet. First one coming soon.</p>
        )}

        <div className="space-y-px">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start justify-between py-5 border-b border-border hover:bg-card/40 px-2 -mx-2 rounded transition-colors duration-150"
            >
              <div className="flex-1 pr-8">
                <p className="font-mono text-sm font-medium text-foreground group-hover:text-foreground mb-1">
                  {post.title}
                </p>
                <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
                {post.tags.length > 0 && (
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-border text-muted-foreground/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-mono text-[10px] text-muted-foreground/40 whitespace-nowrap pt-0.5">
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
