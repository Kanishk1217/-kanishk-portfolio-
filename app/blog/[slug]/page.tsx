import { getPost } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/blog")
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — Kanishk Pansari`, description: post.description }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="h-10 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-md sticky top-0 z-20">
        <Link href="/blog" className="font-mono text-[11px] tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase">
          ← Writing
        </Link>
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </span>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          {post.tags.map((tag) => (
            <span key={tag} className="font-mono text-[9px] px-2 py-0.5 rounded border border-border text-muted-foreground mr-1.5">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-mono text-xl font-semibold text-foreground leading-snug mb-4">
          {post.title}
        </h1>
        <p className="font-mono text-sm text-muted-foreground mb-12 leading-relaxed">
          {post.description}
        </p>

        <div className="prose prose-sm prose-invert max-w-none
          prose-headings:font-mono prose-headings:font-semibold prose-headings:text-foreground
          prose-h2:text-base prose-h2:mt-10 prose-h2:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[13px]
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:font-mono prose-code:text-[11px] prose-code:bg-card prose-code:border prose-code:border-border prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground/80
          prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-lg
          prose-li:text-muted-foreground prose-li:text-[13px]
          prose-a:text-foreground prose-a:underline prose-a:underline-offset-2">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  )
}
