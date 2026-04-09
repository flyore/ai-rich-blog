import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Newsletter from '@/components/Newsletter'
import Comments from '@/components/Comments'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const categoryColors: Record<string, string> = {
    'AI 입문': 'bg-blue-100 text-blue-700',
    'AI 도구 활용': 'bg-emerald-100 text-emerald-700',
    'AI 수익화': 'bg-violet-100 text-violet-700',
  }
  const colorClass = categoryColors[post.category] ?? 'bg-gray-100 text-gray-700'

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-violet-600">홈</Link>
        <span>/</span>
        <Link href={`/category/${encodeURIComponent(post.category)}`} className="hover:text-violet-600">
          {post.category}
        </Link>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.readingTime} 읽기</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-gray-500 mb-4">{post.description}</p>
        <div className="flex items-center gap-3 text-sm text-gray-400 border-t border-gray-100 pt-4">
          <time>{post.date}</time>
          {post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <article className="prose max-w-none bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>

      {/* Back link */}
      <div className="mt-10">
        <Link href={`/category/${encodeURIComponent(post.category)}`} className="text-sm text-violet-600 font-medium hover:underline">
          ← {post.category} 목록으로 돌아가기
        </Link>
      </div>

      {/* Comments */}
      <Comments />

      {/* Newsletter */}
      <div className="mt-12">
        <Newsletter />
      </div>
    </div>
  )
}
