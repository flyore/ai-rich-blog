'use client'

import { useState } from 'react'

export default function Comments() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setStatus('loading')

    try {
      const res = await fetch('https://formspree.io/f/FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        💬 댓글 & 질문
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {status === 'success' ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <p className="font-bold text-gray-900 text-lg mb-1">댓글이 등록됐습니다!</p>
            <p className="text-sm text-gray-500 mb-6">소중한 의견 감사합니다. 최대한 빠르게 답변드릴게요.</p>
            <button
              onClick={() => setStatus('idle')}
              className="text-sm text-violet-600 font-medium hover:underline"
            >
              댓글 더 남기기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름 (닉네임)
              </label>
              <input
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                댓글 / 질문
              </label>
              <textarea
                placeholder="궁금한 점이나 소감을 남겨주세요. 모든 댓글에 답변드립니다 😊"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500">오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? '전송 중...' : '댓글 남기기'}
            </button>

            <p className="text-xs text-center text-gray-400">
              댓글은 이메일로 전달되며 직접 답변드립니다.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
