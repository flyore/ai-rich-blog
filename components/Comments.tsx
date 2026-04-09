'use client'

import { useState } from 'react'

export default function Comments() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText('ozstory55@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        💬 질문 & 피드백
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* 이메일 문의 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="text-2xl mb-3">✉️</div>
          <h3 className="font-bold text-gray-900 mb-1">이메일로 질문하기</h3>
          <p className="text-sm text-gray-500 mb-4">
            궁금한 점, 다뤘으면 하는 주제, 오류 제보 등 무엇이든 보내주세요.
            최대한 빠르게 답변드립니다.
          </p>
          <button
            onClick={copyEmail}
            className="w-full py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors"
          >
            {copied ? '✅ 복사됨!' : '이메일 주소 복사하기'}
          </button>
        </div>

        {/* 주제 요청 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="text-2xl mb-3">💡</div>
          <h3 className="font-bold text-gray-900 mb-1">다룰 주제 요청하기</h3>
          <p className="text-sm text-gray-500 mb-4">
            "이런 내용이 궁금해요", "이 주제로 글 써주세요" 같은 요청을 받습니다.
            여러분의 의견이 다음 글이 됩니다.
          </p>
          <a
            href="https://github.com/flyore/ai-rich-blog/discussions/new?category=general"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors text-center"
          >
            GitHub에서 요청하기
          </a>
        </div>

      </div>

      {/* 반응 버튼 */}
      <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <p className="text-sm text-center text-gray-500 mb-3">이 글이 도움이 됐나요?</p>
        <div className="flex justify-center gap-3">
          {['👍 도움됐어요', '🤔 이해가 어려워요', '💡 더 알고 싶어요'].map(reaction => (
            <button
              key={reaction}
              onClick={() => alert('소중한 피드백 감사합니다! 😊')}
              className="px-4 py-2 text-sm bg-gray-50 hover:bg-violet-50 hover:text-violet-700 border border-gray-200 rounded-full transition-colors"
            >
              {reaction}
            </button>
          ))}
        </div>
      </div>

    </section>
  )
}
