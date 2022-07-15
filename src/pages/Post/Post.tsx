import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import Markdown from '../../components/Markdown'
import { usePost } from '../../hooks/posts'
import './Post.scss'

export default function Post() {
  const { slug } = useParams()
  const post = usePost(slug!)

  console.log(post)
  return (
    <div className='post'>
      <h1>{post.data.title}</h1>
      <div className="post-date">
        {dayjs(post.data.date).format('DD MMMM, YYYY')}
      </div>
      <Markdown md={post.content} />
    </div>
  )
}
