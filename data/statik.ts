import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { Router } from 'itty-router'

export default function registerStatik(router: Router) {
  router.get('/posts', async () => {
    const ls = await fs.readdir(path.resolve(process.cwd(), 'content'))
    const posts = []
    for (const pathname of ls) {
      const md = await fs.readFile(
        path.resolve(process.cwd(), 'content', pathname),
        'utf-8'
      )
      const parsed = matter(md)
      posts.push({ data: parsed.data })
    }
    return posts
  })

  router.get(
    '/posts/:slug',
    async ({ params }: { params: { slug: string } }) => {
      const { slug } = params
      const md = await fs.readFile(
        path.resolve(process.cwd(), 'content', `${slug}.md`),
        'utf-8'
      )
      const parsed = matter(md)
      return {
        data: parsed.data,
        content: parsed.data,
      }
    }
  )
}
