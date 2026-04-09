import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  category: string
  tags: string[]
  readingTime: string
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'))

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const rt = readingTime(content)

    return {
      slug,
      title: data.title ?? '',
      date: data.date ?? '',
      description: data.description ?? '',
      category: data.category ?? '미분류',
      tags: data.tags ?? [],
      readingTime: `${Math.ceil(rt.minutes)}분`,
      content,
    } as Post
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const rt = readingTime(content)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    description: data.description ?? '',
    category: data.category ?? '미분류',
    tags: data.tags ?? [],
    readingTime: `${Math.ceil(rt.minutes)}분`,
    content,
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = posts.map(p => p.category)
  return [...new Set(categories)]
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(p => p.category === category)
}
