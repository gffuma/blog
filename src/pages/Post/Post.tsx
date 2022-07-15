import { useParams } from 'react-router-dom'
import { usePost } from '../../hooks/posts'
import './Post.scss'

export default function Post() {
  const { slug } = useParams()
  const post = usePost(slug!)

  console.log(post)
  return <div>Blog</div>
}
