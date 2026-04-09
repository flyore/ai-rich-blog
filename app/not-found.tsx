import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <p className="text-6xl mb-6">🤖</p>
      <h1 className="text-3xl font-black text-gray-900 mb-3">페이지를 찾을 수 없어요</h1>
      <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
