import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Newsletter from '@/components/Newsletter'
import Link from 'next/link'

export default function HomePage() {
  const posts = getAllPosts()
  const featured = posts[0]
  const recent = posts.slice(1, 7)

  const categories = [
    { name: 'AI 입문', desc: 'AI가 처음이라면 여기서 시작하세요', emoji: '🌱', href: '/category/AI 입문' },
    { name: 'AI 도구 활용', desc: 'ChatGPT, Claude 실전 활용법', emoji: '🛠️', href: '/category/AI 도구 활용' },
    { name: 'AI 수익화', desc: '실제로 돈이 되는 AI 활용 전략', emoji: '💰', href: '/category/AI 수익화' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-16">

      {/* Hero */}
      <section className="text-center py-10">
        <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
          완전 초보자를 위한 AI 수익화 가이드
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
          AI로 <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">부자</span>가 되는 법
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          코딩 몰라도 됩니다. AI 도구만 잘 써도 매달 수익을 만들 수 있어요.
          단계별로 차근차근 알려드립니다.
        </p>
        <Link
          href="#posts"
          className="inline-block px-8 py-3 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
        >
          지금 시작하기 →
        </Link>
      </section>

      {/* Category Cards */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">주제별 탐색</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map(cat => (
            <Link key={cat.name} href={cat.href} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <h3 className="font-bold text-gray-900 group-hover:text-violet-600 transition-colors mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">추천 글</h2>
          <Link href={`/blog/${featured.slug}`} className="group block bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-8 text-white hover:shadow-xl transition-all">
            <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full">{featured.category}</span>
            <h2 className="text-2xl font-black mt-3 mb-2 group-hover:underline">{featured.title}</h2>
            <p className="text-sm opacity-80 mb-4 line-clamp-2">{featured.description}</p>
            <div className="flex items-center gap-3 text-xs opacity-70">
              <time>{featured.date}</time>
              <span>·</span>
              <span>{featured.readingTime} 읽기</span>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts */}
      <section id="posts">
        <h2 className="text-xl font-bold text-gray-900 mb-4">최신 글</h2>
        {recent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recent.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-10">아직 글이 없습니다. 곧 업로드 예정입니다!</p>
        )}
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
