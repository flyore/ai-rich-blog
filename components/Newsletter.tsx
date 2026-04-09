'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section id="newsletter" className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl px-8 py-12 text-white text-center">
      <p className="text-sm font-semibold tracking-widest uppercase opacity-80 mb-2">무료 뉴스레터</p>
      <h2 className="text-2xl md:text-3xl font-black mb-3">
        매주 AI 수익화 노하우를 받아보세요
      </h2>
      <p className="text-sm opacity-80 mb-8 max-w-md mx-auto">
        실제로 써먹을 수 있는 AI 활용법, 수익화 사례, 무료 툴 정보를 매주 보내드립니다.
      </p>

      {submitted ? (
        <div className="bg-white/20 rounded-2xl px-6 py-4 inline-block">
          <p className="font-bold text-lg">구독 신청 완료!</p>
          <p className="text-sm opacity-80 mt-1">곧 첫 번째 뉴스레터를 보내드릴게요.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="이메일 주소 입력"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-violet-600 font-bold rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            무료 구독하기
          </button>
        </form>
      )}
    </section>
  )
}
