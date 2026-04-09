import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: {
    default: 'AI로 부자되기 — 완전 초보자를 위한 AI 수익화 가이드',
    template: '%s | AI로 부자되기',
  },
  description: '완전 초보자도 AI로 수익 내는 법을 알려드립니다. AI 입문부터 실전 수익화까지 단계별로 배워보세요.',
  keywords: ['AI 수익화', 'AI 부업', 'ChatGPT 활용', 'AI 입문', '인공지능 돈벌기'],
  openGraph: {
    title: 'AI로 부자되기',
    description: '완전 초보자도 AI로 수익 내는 법을 알려드립니다.',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
