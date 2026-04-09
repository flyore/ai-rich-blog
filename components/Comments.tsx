'use client'

import { useEffect, useRef } from 'react'

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'flyore/ai-rich-blog')
    script.setAttribute('data-repo-id', 'REPO_ID_HERE')
    script.setAttribute('data-category', 'Comments')
    script.setAttribute('data-category-id', 'CATEGORY_ID_HERE')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)
  }, [])

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        💬 댓글 & 질문
      </h2>
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <div ref={ref} />
      </div>
    </section>
  )
}
