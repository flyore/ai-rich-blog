import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map(cat => ({ category: cat }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const name = decodeURIComponent(category)
  return {
    title: name,
    description: `${name} 관련 AI 수익화 글 모음`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const name = decodeURIComponent(category)
  const posts = getPostsByCategory(name)

  const emojiMap: Record<string, string> = {
    'AI 입문': '🌱',
    'AI 도구 활용': '🛠️',
    'AI 수익화': '💰',
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-violet-600">홈</Link>
        <span>/</span>
        <span className="text-gray-600">{name}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="text-4xl mb-3">{emojiMap[name] ?? '📂'}</div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">{name}</h1>
        <p className="text-gray-500">총 {posts.length}개의 글</p>
      </header>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📝</p>
          <p>아직 글이 없습니다. 곧 업로드 예정입니다!</p>
        </div>
      )}

      <div className="mt-10">
        <Link href="/" className="text-sm text-violet-600 font-medium hover:underline">
          ← 홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
