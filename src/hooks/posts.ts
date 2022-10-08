import { useResource } from './resource'
import fm from 'front-matter'
import { Post, PostPreview } from '../types'

async function fetchPost(slug: string) {
  const m = await import(`../../content/${slug}.md?raw`)
  const parsed = fm(m.default)
  return {
    data: parsed.attributes,
    content: parsed.body,
  } as Post
}

function fetchPosts() {
  const contextRequire = (import.meta as any).webpackContext(`../../content`, {
    recursive: false,
    regExp: /.md$/,
  })
  return Promise.all(
    contextRequire.keys().map((p: string) =>
      fetchPost(p.replace('./', '').replace('.md', '')).then((p) => ({
        data: p.data,
      }))
    )
  ) as Promise<PostPreview[]>
}

export function usePost(slug: string) {
  return useResource(`post:${slug}`, () => fetchPost(slug))
}

export function usePosts() {
  return useResource('posts', fetchPosts)
}
