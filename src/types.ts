export interface PostPreview {
  data: {
    title: string
    slug: string
    subtitle: string
    date: string
  }
}

export interface Post extends PostPreview {
  content: string
}