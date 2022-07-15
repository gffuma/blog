import { useQuery } from 'react-query'
import statik from '@pluffa/statik'
import { Post, PostPreview } from '../types'

export function usePosts() {
  return useQuery<PostPreview[]>('posts', () => statik('/posts')).data!
}

export function usePost(slug: string) {
  return useQuery<Post>(['posts', slug], () => statik(`/posts/${slug}`)).data!
}
