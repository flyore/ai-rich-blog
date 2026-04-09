/**
 * 매일 자동으로 블로그 글을 생성하는 스크립트
 * GitHub Actions에서 실행됩니다.
 * 실행 방법: node scripts/generate-post.mjs
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const categories = ['AI 입문', 'AI 도구 활용', 'AI 수익화']

// 오늘 날짜 기준으로 카테고리 순환
function getTodayCategory() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  return categories[dayOfYear % categories.length]
}

function getTodayDateString() {
  return new Date().toISOString().split('T')[0]
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const categoryPrompts = {
  'AI 입문': `완전 초보자를 위한 AI 입문 블로그 글을 작성해줘.
주제는 AI를 처음 접하는 사람이 쉽게 시작할 수 있는 내용으로 해줘.
아직 다루지 않은 새로운 주제여야 해.`,

  'AI 도구 활용': `실용적인 AI 도구 활용 블로그 글을 작성해줘.
ChatGPT, Claude, Gemini, Midjourney, Canva AI 등 무료로 쓸 수 있는 도구 중 하나를 골라
초보자도 따라할 수 있게 단계별로 설명해줘.`,

  'AI 수익화': `AI를 활용한 실제 수익화 방법을 다루는 블로그 글을 작성해줘.
현실적으로 초보자가 시작할 수 있고 실제로 돈이 되는 방법을 알려줘.
구체적인 플랫폼, 단가, 시작 방법을 포함해줘.`,
}

async function generatePost() {
  const category = getTodayCategory()
  const today = getTodayDateString()

  console.log(`오늘의 카테고리: ${category}`)

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `${categoryPrompts[category]}

다음 형식으로 MDX 블로그 글을 작성해줘:

---
title: "글 제목"
date: "${today}"
description: "글 설명 (2줄 이내)"
category: "${category}"
tags: ["태그1", "태그2", "태그3"]
---

(본문 내용)

요구사항:
- 완전 초보자도 이해할 수 있는 쉬운 말투
- 실제로 따라할 수 있는 구체적인 내용
- 소제목(##)으로 구분된 5~7개 섹션
- 마크다운 표, 코드블록, 인용구 적절히 활용
- 1500자 이상
- frontmatter부터 시작해서 MDX 형식 그대로 출력`,
      },
    ],
  })

  const content = response.content[0].text

  // frontmatter에서 title 추출해서 slug 생성
  const titleMatch = content.match(/title:\s*["'](.+?)["']/)
  const title = titleMatch ? titleMatch[1] : `post-${today}`
  const slug = `${today}-${slugify(title).slice(0, 40)}`

  const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`)
  fs.writeFileSync(filePath, content, 'utf8')

  console.log(`글 생성 완료: ${filePath}`)
  console.log(`제목: ${title}`)

  // GitHub Actions output 설정
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `post_title=${title}\n`)
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `post_slug=${slug}\n`)
  }
}

generatePost().catch(console.error)
