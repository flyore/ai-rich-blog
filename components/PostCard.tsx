import Link from 'next/link'
import type { Post } from '@/lib/posts'

const categoryColors: Record<string, string> = {
  'AI 입문': 'bg-blue-100 text-blue-700',
  'AI 도구 활용': 'bg-emerald-100 text-emerald-700',
  'AI 수익화': 'bg-violet-100 text-violet-700',
}

export default function PostCard({ post }: { post: Post }) {
  const colorClass = categoryColors[post.category] ?? 'bg-gray-100 text-gray-700'

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.readingTime} 읽기</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-violet-600 transition-colors leading-snug mb-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <time>{post.date}</time>
          <span className="text-violet-500 font-medium group-hover:underline">읽어보기 →</span>
        </div>
      </article>
    </Link>
  )
}
