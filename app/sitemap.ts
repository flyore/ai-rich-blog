import { getAllPosts, getAllCategories } from '@/lib/posts'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://ai-rich-blog.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${BASE_URL}/category/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    ...categoryEntries,
    ...postEntries,
  ]
}
