'use client'

import Link from 'next/link'
import { useState } from 'react'

const categories = ['AI 입문', 'AI 도구 활용', 'AI 수익화']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            AI로 부자되기
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors"
            >
              {cat}
            </Link>
          ))}
          <Link
            href="#newsletter"
            className="text-sm font-semibold px-4 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
          >
            무료 구독
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="text-sm font-medium text-gray-700 hover:text-violet-600"
              onClick={() => setMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}
          <Link
            href="#newsletter"
            className="text-sm font-semibold px-4 py-2 bg-violet-600 text-white rounded-full text-center hover:bg-violet-700"
            onClick={() => setMenuOpen(false)}
          >
            무료 구독
          </Link>
        </div>
      )}
    </header>
  )
}
