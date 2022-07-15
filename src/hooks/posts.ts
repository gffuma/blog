import { useQuery } from 'react-query'
import statik from '@pluffa/statik'

export function usePosts() {
  return useQuery('posts', () => statik('/posts')).data
}

export function usePost(slug: string) {
  return useQuery(['posts', slug], () => statik(`/posts/${slug}`)).data
}
