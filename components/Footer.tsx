import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <span className="text-lg font-black bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            AI로 부자되기
          </span>
          <p className="mt-2 text-sm text-gray-500">
            완전 초보자도 AI로 수익 내는 법을 알려드립니다.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-gray-500">
          <Link href="/category/AI 입문" className="hover:text-violet-600">AI 입문</Link>
          <Link href="/category/AI 도구 활용" className="hover:text-violet-600">AI 도구 활용</Link>
          <Link href="/category/AI 수익화" className="hover:text-violet-600">AI 수익화</Link>
        </nav>
      </div>
      <div className="border-t border-gray-100 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} AI로 부자되기. All rights reserved.
      </div>
    </footer>
  )
}
