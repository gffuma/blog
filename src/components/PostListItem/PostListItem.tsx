import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import './PostListItem.scss'
import { PostPreview } from '../../types'

export default function PostListItem({ post }: { post: PostPreview }) {
  return (
    <div className="post-list-item">
      <Link to={`/${post.data.slug}`}>
        <h2>{post.data.title}</h2>
      </Link>
      <div className="post-list-item-date">
        {dayjs(post.data.date).format('DD MMMM, YYYY')}
      </div>
      <p>{post.data.subtitle}</p>
    </div>
  )
}
